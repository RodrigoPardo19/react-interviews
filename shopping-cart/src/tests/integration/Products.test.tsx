import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Products } from '../../components/Products';
import { CartItem, INITIAL_CATEGORY, Product } from '../../types/types';
import { FiltersContext } from '../../contexts/filters';
import { CartContext } from '../../contexts/cart';

describe('Products', () => {
	it('should render no result when products is empty', () => {
		const filters = { category: INITIAL_CATEGORY, pricing: { min: 0, max: 0 } };
		const filterByCategory = vi.fn();
		const filterByPricing = vi.fn();

		const cart: CartItem[] = [];
		const products: Product[] = [];
		const addToCart = vi.fn();
		const deleteFromCart = vi.fn();
		const increaseItemCount = vi.fn();
		const decreaseItemCount = vi.fn();

		const utils = render(
			<CartContext.Provider
				value={{ cart, products, addToCart, deleteFromCart, increaseItemCount, decreaseItemCount }}
			>
				<FiltersContext.Provider value={{ filters, filterByCategory, filterByPricing }}>
					<Products />
				</FiltersContext.Provider>
			</CartContext.Provider>,
		);

		const noResult = utils.getByRole('status');

		expect(noResult.textContent).toBe('No data');
	});
});
