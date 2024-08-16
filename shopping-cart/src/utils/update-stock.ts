import { Product } from '../types/types';

export const increaseStock = (products: Product[], product: Product, count?: number) => {
	if (products.some((el) => el.id === product.id)) {
		return products.map((el) => {
			return el.id === product.id ? { ...el, stock: el.stock + (count ?? 1) } : { ...el };
		});
	}

	return [...products, { ...product, stock: count ?? 1 }];
};

export const decreaseStock = (products: Product[], product: Product) => {
	return products.reduce((acc, el) => {
		if (el.id === product.id) {
			return el.stock - 1 === 0 ? [...acc] : [...acc, { ...el, stock: el.stock - 1 }];
		}
		return [...acc, { ...el }];
	}, [] as Product[]);
};
