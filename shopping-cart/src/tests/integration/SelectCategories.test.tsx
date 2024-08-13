import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SelectCategories } from '../../components/SelectCategories';
import { INITIAL_CATEGORY } from '../../types/types';
import { FiltersContext } from '../../contexts/filters';
import * as useCategoriesHook from '../../hooks/useCategories';

describe('SelectCategories', () => {
	it('should be always present the initial category in the options of the select', async () => {
		const filters = { category: INITIAL_CATEGORY, pricing: { min: 0, max: 0 } };
		const filterByCategory = vi.fn();
		const filterByPricing = vi.fn();

		const categoriesSpy = vi.spyOn(useCategoriesHook, 'useCategories');
		const categories = [INITIAL_CATEGORY, 'fragances', 'furnitures'];

		categoriesSpy.mockReturnValue({ categories });

		const utils = render(
			<FiltersContext.Provider value={{ filters, filterByCategory, filterByPricing }}>
				<SelectCategories />
			</FiltersContext.Provider>,
		);

		const select = (await utils.findByLabelText(/Categorías/i)) as HTMLSelectElement;
		const options = utils.getAllByRole('option') as HTMLOptionElement[];

		expect(options.some((el) => el.value === INITIAL_CATEGORY)).toBe(true);
		expect(select.value).toBe(INITIAL_CATEGORY);
	});
});
