import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { PricingFilter } from '../components/PricingFilter';
import { FiltersContext } from '../contexts/filters';
import userEvent from '@testing-library/user-event';
import { INITIAL_CATEGORY } from '../types/types';

const setup = () => {
	const filters = { category: INITIAL_CATEGORY, pricing: { min: 0, max: 0 } };
	const filterByCategory = vi.fn();
	const filterByPricing = vi.fn();

	const utils = render(
		<FiltersContext.Provider value={{ filters, filterByCategory, filterByPricing }}>
			<PricingFilter />
		</FiltersContext.Provider>,
	);

	const minInput = utils.getByPlaceholderText(/Mínimo/i) as HTMLInputElement;
	const maxInput = utils.getByPlaceholderText(/Máximo/i) as HTMLInputElement;

	return { minInput, filterByPricing, maxInput };
};

// TODO: Hay que aprender a testear diferentes partes por ejemplo los components, reducers, contexts y hooks (quizá estos serían más unitarios)
describe('Pricing Filter Component', () => {
	// E2E (happy path): debería ser que al filtrar por precio cambien la lista de productos (hacer con playwright)

	// Integration Test (mock de api call)
	// TODO: Configurar de buena manera vitest y react testing library para integration tests (before each)
	// TODO: Aprender buenas prácticas (don't test implementation details) leer blog de Kent C Dodds
	// TODO: Como mockear las api calls que están dentro de un contexto y las que están dentro de un useEffect
	it('should change the min pricing state when i type in the min input, and the max should be empty string', async () => {
		const { minInput, filterByPricing, maxInput } = setup();
		const MIN_PRICE = '10000';
		await userEvent.type(minInput, '10000');

		expect(minInput.value).toBe(MIN_PRICE);
		expect(maxInput.value).toBe('');
		expect(filterByPricing).toHaveBeenCalledWith({ min: Number(MIN_PRICE) });
	});

	it('should change the max pricing state when i type in the max input, the min should be an empty string', async () => {
		const { minInput, maxInput, filterByPricing } = setup();
		const MAX_PRICE = '10000';

		await userEvent.type(maxInput, MAX_PRICE);

		expect(maxInput.value).toBe(MAX_PRICE);
		expect(minInput.value).toBe('');
		expect(filterByPricing).toHaveBeenCalledWith({ max: Number(MAX_PRICE) });
	});

	it('should change the max and min pricing state when type in the inputs', async () => {
		const { minInput, maxInput, filterByPricing } = setup();
		const MIN_PRICE = '10000';
		const MAX_PRICE = '50000';

		await userEvent.type(minInput, MIN_PRICE);
		await userEvent.type(maxInput, MAX_PRICE);

		expect(minInput.value).toBe(MIN_PRICE);
		expect(maxInput.value).toBe(MAX_PRICE);
		expect(filterByPricing).toHaveBeenCalledWith({ min: Number(MIN_PRICE) });
		expect(filterByPricing).toHaveBeenCalledWith({ max: Number(MAX_PRICE) });
	});

	// TODO: the functions "handleMin and handleMax" in the component should be a unit test
	it('should not set the new state when a non positive number is typed in', async () => {
		const { minInput, maxInput, filterByPricing } = setup();
		const NEGATIVE_NUMBER = '-50';

		await userEvent.type(minInput, NEGATIVE_NUMBER);
		await userEvent.type(maxInput, NEGATIVE_NUMBER);

		expect(filterByPricing).not.toHaveBeenCalled();
	});

	it('should not set the new state when i type a text in the input that expect a number', async () => {
		const { minInput, maxInput, filterByPricing } = setup();
		const NOT_NUMERIC = 'holamundo-*2';

		await userEvent.type(minInput, NOT_NUMERIC);
		await userEvent.type(maxInput, NOT_NUMERIC);

		expect(filterByPricing).not.toHaveBeenCalled();
	});
});
