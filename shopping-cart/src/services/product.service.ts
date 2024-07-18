import { PaginatedProducs, Product } from '../types/types';

export async function findAll(): Promise<Product[] | undefined> {
	try {
		const response = await fetch('./src/services/products.json');
		if (!response.ok) {
			throw new Error('Error');
		}
		const { products }: PaginatedProducs = await response.json();
		return products;
	} catch (error) {
		console.log('error', error);
	}
}
