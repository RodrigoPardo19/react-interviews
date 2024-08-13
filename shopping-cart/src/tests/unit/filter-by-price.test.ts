import { describe, expect, it } from 'vitest';
import { filterByPrincing } from '../../utils/filter-by-price';
import { Product } from '../../types/types';

const products: Product[] = [
	{
		id: 1,
		title: 'Palta',
		description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim',
		price: 12.99,
		category: 'fruits & vegetables',
		stock: 58,
		thumbnail: '',
	},
	{
		id: 2,
		title: 'Tomate',
		description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim',
		price: 20.0,
		category: 'fruits & vegetables',
		stock: 18,
		thumbnail: '',
	},
	{
		id: 3,
		title: 'Pepino',
		description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim',
		price: 2.9,
		category: 'fruits & vegetables',
		stock: 20,
		thumbnail: '',
	},
	{
		id: 4,
		title: '',
		description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim',
		price: 31.12,
		category: 'fruits & vegetables',
		stock: 87,
		thumbnail: '',
	},
];

describe('filter by price', () => {
	it('should', () => {
		const pricing = { min: 10, max: 20 };
		const result = filterByPrincing(pricing, products);

		expect(result.every((el) => el.price >= pricing.min && el.price <= pricing.max)).toBe(true);
	});

	it('should', () => {
		const pricing = { min: 10 };
		const result = filterByPrincing(pricing, products);

		expect(result.every((el) => el.price >= pricing.min)).toBe(true);
	});

	it('should', () => {
		const pricing = { max: 10 };
		const result = filterByPrincing(pricing, products);

		expect(result.every((el) => el.price <= pricing.max)).toBe(true);
	});

	it('should', () => {
		const pricing = {};
		const result = filterByPrincing(pricing, products);

		expect(result.every((el) => products.includes(el))).toBe(true);
	});
});
