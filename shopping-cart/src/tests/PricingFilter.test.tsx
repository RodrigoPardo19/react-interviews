import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { PricingFilter } from '../components/PricingFilter';
import { FiltersProvider } from '../contexts/filters';
import userEvent from '@testing-library/user-event';

const renderPricingFilter = () => {
	const pricingFilter = render(
		<FiltersProvider>
			<PricingFilter />
		</FiltersProvider>,
	);

	const minInput = pricingFilter.getByPlaceholderText(/Mínimo/i) as HTMLInputElement;
	const maxInput = pricingFilter.getByPlaceholderText(/Máximo/i) as HTMLInputElement;

	return { minInput, maxInput };
};

// TODO: Hay que aprender a testear diferentes partes por ejemplo los components, reducers, contexts y hooks (quizá estos serían más unitarios)
describe('Pricing Filter Component', () => {
	// E2E (happy path): debería ser que al filtrar por precio cambien la lista de productos (hacer con playwright)

	// Integration Test (mock de api call)
	// TODO: Configurar de buena manera vitest y react testing library para integration tests (before each)
	// TODO: Aprender buenas prácticas (don't test implementation details) leer blog de Kent C Dodds
	// TODO: Como mockear las api calls que están dentro de un contexto y las que están dentro de un useEffect
	it('should change the min pricing state when i type in the min input, and the max should be empty string', async () => {
		const { minInput, maxInput } = renderPricingFilter();
		const MIN_PRICE = '10000';
		await userEvent.type(minInput, '10000');

		expect(minInput.value).toBe(MIN_PRICE);
		expect(maxInput.value).toBe('');
	});

	it('should change the max pricing state when i type in the max input, the min should be an empty string', async () => {
		const { minInput, maxInput } = renderPricingFilter();
		const MAX_PRICE = '10000';

		await userEvent.type(maxInput, MAX_PRICE);

		expect(maxInput.value).toBe(MAX_PRICE);
		expect(minInput.value).toBe('');
	});

	it('should change the max and min pricing state when type in the inputs', async () => {
		const { minInput, maxInput } = renderPricingFilter();
		const MIN_PRICE = '10000';
		const MAX_PRICE = '50000';

		await userEvent.type(minInput, MIN_PRICE);
		await userEvent.type(maxInput, MAX_PRICE);

		expect(minInput.value).toBe(MIN_PRICE);
		expect(maxInput.value).toBe(MAX_PRICE);
	});
});

it('should display an alert when a non positive number is typed in', () => {});
// it('should trigger an alert when i type a text in the input that expect a number', () => {});
// it('should remove the product from the list if the stock is 0', () => {});
// the function "filterByPricing" in the component should be a unit a test
