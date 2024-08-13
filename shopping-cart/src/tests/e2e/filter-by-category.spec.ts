import test, { expect } from '@playwright/test';
import { INITIAL_CATEGORY } from '../../types/types';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:5173');
});

test.describe('filter by category', () => {
	test('should list the products that belongs to the selected category', async ({ page }) => {
		const select = page.getByLabel(/Categorías/i);

		const options = await select.evaluate((select: HTMLSelectElement, INITIAL_CATEGORY: string) => {
			return Array.from(select.options)
				.map((el) => el.value)
				.filter((el) => el !== INITIAL_CATEGORY);
		}, INITIAL_CATEGORY);

		const option = options[Math.floor(Math.random() * (options.length - 1))];

		await select.selectOption(option);

		const products = await page.getByRole('listitem').all();

		for (const item of products) {
			const category = item.locator('#product-category');
			await expect(category).toHaveText(option);
		}
	});
});
