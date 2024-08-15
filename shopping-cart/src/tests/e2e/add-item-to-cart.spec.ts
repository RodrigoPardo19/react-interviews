import { test, expect } from '@playwright/test';
import { CartItem } from '../../types/types';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:5173');
});

test.describe('Add item to cart', () => {
	test('should render the items in the cart when a product is clicked from the product list', async ({
		page,
	}) => {
		const firstProduct = page.getByRole('listitem', { name: 'product-item' }).nth(0);
		const initialFirstProductStock = await firstProduct
			.getByTestId('product-stock')
			.getByRole('strong')
			.textContent();

		await firstProduct.getByRole('button', { name: /add-to-cart/i }).click();

		const secondProduct = page.getByRole('listitem', { name: 'product-item' }).nth(1);
		const initialSecondProductStock = await secondProduct
			.getByTestId('product-stock')
			.getByRole('strong')
			.textContent();

		const secondAddToCartButton = secondProduct.getByRole('button', { name: /add-to-cart/i });
		await secondAddToCartButton.click();
		await secondAddToCartButton.click();

		await page.getByRole('button', { name: /show-cart/i }).click();
		const cartItems = page.getByRole('listitem', { name: /cart-item/i });

		const ITEMS_IN_THE_CART = 2;
		await expect(cartItems).toHaveCount(ITEMS_IN_THE_CART);

		const itemCounts = page.getByTestId('cart-item-count');

		await expect(itemCounts).toHaveText([/Cantidad 1/i, /Cantidad 2/i]);

		const finalFirstProductStock = page
			.getByRole('listitem', { name: 'product-item' })
			.nth(0)
			.getByTestId('product-stock')
			.getByRole('strong');

		const finalSecondProductStock = page
			.getByRole('listitem', { name: 'product-item' })
			.nth(1)
			.getByTestId('product-stock')
			.getByRole('strong');

		const expectedFirstStock = Number(initialFirstProductStock) - 1;
		const expectedSecondStock = Number(initialSecondProductStock) - 2;

		await expect(finalFirstProductStock).toHaveText(expectedFirstStock.toString());
		await expect(finalSecondProductStock).toHaveText(expectedSecondStock.toString());

		const cartInLocalStorage: CartItem[] = await page.evaluate(() => {
			return JSON.parse(localStorage.getItem('cart') ?? '[]');
		});

		expect(cartInLocalStorage.length).toBe(ITEMS_IN_THE_CART);
	});

	// integration test
	// test('cuando agrego un item y el stock de ese producto llega a 0, entonces la lista de producto no debería renderizar ese producto', () => {});
	// test('si no hay productos en el carrito se debe mostrar un mensaje de vacío', () => {});
	// test('no sé si combiene testear un reducer como un test de integración', () => {});

	// unit test
	// test('increase stock', () => {});
	// test('decrease stock', () => {});
});
