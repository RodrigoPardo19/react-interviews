import { Product } from '../types/types';

export const filterByPrincing = (princing: { min?: number; max?: number }, products: Product[]) => {
	const { min, max } = princing;
	if (min && max) {
		return products.filter((el) => el.price >= min && el.price <= max);
	}
	if (min) {
		return products.filter((el) => el.price >= min);
	}
	if (max) {
		return products.filter((el) => el.price <= max);
	}
	return products;
};
