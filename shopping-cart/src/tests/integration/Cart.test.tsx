import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Cart } from '../../components/Cart';
import { CartContext } from '../../contexts/cart';
import { CartItem, Product } from '../../types/types';
import userEvent from '@testing-library/user-event';

describe('Cart interactions', () => {
	it('display no items text if there are no items in the cart', async () => {
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
				<Cart />
			</CartContext.Provider>,
		);

		const showCartButton = utils.getByRole('button', { name: /show-cart/i }) as HTMLButtonElement;

		await userEvent.click(showCartButton);

		const noData = utils.getByTestId('cart-no-items');
		expect(noData.textContent).toBe('No hay productos en tu carrito :C');
	});
});
