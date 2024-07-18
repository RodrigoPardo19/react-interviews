import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as ProductService from '../services/product.service';
import { Product } from '../types/types';
import { CartContext, CartContextType } from './cart';

export interface ProductsContextType {
	products: Product[];
	increaseStock: (product: Product, count?: number) => void;
	decreaseStock: (product: Product) => void;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasBeenInitialized, setHasBeenInitialized] = useState(false);
	const { cart } = useContext(CartContext) as CartContextType;

	useEffect(() => {
		ProductService.findAll().then((response) => {
			if (response) {
				setProducts(response);
				setIsLoaded(true);
			}
		});
	}, []);

	useEffect(() => {
		if (isLoaded && !hasBeenInitialized) {
			setProducts((current) => {
				return current.map((el) => {
					const item = cart.find((c) => c.product.id === el.id);
					return item ? { ...el, stock: el.stock - item.count } : { ...el };
				});
			});
			setHasBeenInitialized(true);
		}
	}, [cart, isLoaded, hasBeenInitialized]);

	const increaseStock = (product: Product, count?: number) => {
		if (products.some((el) => el.id === product.id)) {
			setProducts(
				products.map((el) => {
					return el.id === product.id ? { ...el, stock: el.stock + (count ?? 1) } : { ...el };
				}),
			);
		} else {
			setProducts([...products, { ...product, stock: count ?? 1 }]);
		}
	};

	const decreaseStock = (product: Product) => {
		setProducts(
			products.reduce((acc, el) => {
				if (el.id === product.id) {
					return el.stock - 1 === 0 ? [...acc] : [...acc, { ...el, stock: el.stock - 1 }];
				}
				return [...acc, { ...el }];
			}, [] as Product[]),
		);
	};

	return (
		<ProductsContext.Provider value={{ products, increaseStock, decreaseStock }}>
			{children}
		</ProductsContext.Provider>
	);
}
