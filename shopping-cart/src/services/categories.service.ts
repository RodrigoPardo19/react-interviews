import { INITIAL_CATEGORY, PaginatedProducs } from '../types/types';

export async function findAll(): Promise<string[] | undefined> {
	try {
		const response = await fetch('./src/services/products.json');
		if (!response.ok) {
			throw new Error('Error');
		}

		const { products }: PaginatedProducs = await response.json();
		return [INITIAL_CATEGORY, ...Array.from(new Set(products.map((el) => el.category)))];
	} catch (error) {
		console.log('error', error);
	}
}
