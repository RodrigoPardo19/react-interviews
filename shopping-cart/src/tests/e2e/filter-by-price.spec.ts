import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:5173');
});

test.describe('Filter by pricing', () => {
	test('should change the items in the product list', async ({ page }) => {
		const minInput = page.getByPlaceholder(/Mínimo/i);
		const maxInput = page.getByPlaceholder(/Máximo/i);

		const MIN_PRICE = 10;
		const MAX_PRICE = 100;

		await minInput.fill(MIN_PRICE.toString());
		await maxInput.fill(MAX_PRICE.toString());
		const items = await page.getByRole('listitem').all();

		for (const item of items) {
			const priceText = await item.locator('#product-price').textContent();
			const price = Number(priceText?.replace('$', ''));
			expect(price).toBeGreaterThanOrEqual(MIN_PRICE);
			expect(price).toBeLessThanOrEqual(MAX_PRICE);
		}
	});
});
