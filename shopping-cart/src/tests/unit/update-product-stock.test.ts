import { describe, expect, it } from 'vitest';
import { Product } from '../../types/types';
import { decreaseStock, increaseStock } from '../../utils/update-stock';
import { Products } from '../../components/Products';

const setup = () => {
	const products: Product[] = [
		{
			id: 1,
			title: 'Palta',
			description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim',
			price: 12.99,
			category: 'fruits & vegetables',
			stock: 1,
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

	const product = {
		id: 4,
		title: '',
		description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim',
		price: 31.12,
		category: 'fruits & vegetables',
		stock: 87,
		thumbnail: '',
	};

	return { products, product };
};

describe('update product stock', () => {
	it('increase product stock', () => {
		const { products, product } = setup();
		const result = increaseStock(products, product);

		expect(result.find((el) => el.id === product.id)?.stock).toBe(product.stock + 1);
	});

	it('increase many product stock', () => {
		const { products, product } = setup();
		const COUNT_TO_INCREASE = 3;
		const result = increaseStock(products, product, COUNT_TO_INCREASE);

		expect(result.find((el) => el.id === product.id)?.stock).toBe(
			product.stock + COUNT_TO_INCREASE,
		);
	});

	it('decrease product stock', () => {
		const { products, product } = setup();
		const result = decreaseStock(products, product);

		expect(result.find((el) => el.id === product.id)?.stock).toBe(product.stock - 1);
	});

	it('remove product if stock is zero', () => {
		const { products } = setup();
		const product = {
			id: 1,
			title: 'Palta',
			description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim',
			price: 12.99,
			category: 'fruits & vegetables',
			stock: 1,
			thumbnail: '',
		};

		const result = decreaseStock(products, product);

		expect(result.find((el) => el.id === product.id)).toBeUndefined();
	});
});
