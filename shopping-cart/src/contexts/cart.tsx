import { createContext, ReactNode, useEffect, useState } from 'react';
import { CartItem, Product } from '../types/types';

export interface CartContextType {
	cart: CartItem[];
	addToCart: (product: Product) => void;
	deleteFromCart: (product: Product) => void;
	increaseItemCount: (product: Product) => void;
	decreaseItemCount: (product: Product) => void;
}

interface CartProviderProps {
	children: ReactNode;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: CartProviderProps) {
	const [cart, setCart] = useState<CartItem[]>([]);

	useEffect(() => {
		const item: CartItem[] = JSON.parse(localStorage.getItem('cart') ?? '[]');
		setCart(item);
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (newProduct: Product) => {
		if (cart.some((el) => el.product?.id === newProduct?.id)) {
			setCart(
				cart.map((el) => {
					if (el.product.id === newProduct.id) return { ...el, count: el.count + 1 };
					return { ...el };
				}),
			);
		} else {
			setCart([...cart, { count: 1, product: { ...newProduct } }]);
		}
	};

	const deleteFromCart = (product: Product) => {
		setCart(cart.filter((el) => el.product.id !== product.id));
	};

	const increaseItemCount = (product: Product) => {
		setCart(
			cart.map((el) => {
				if (el.product.id === product.id) {
					return { ...el, count: el.count + 1 };
				}
				return { ...el };
			}),
		);
	};

	/* Utilzo un reduce el lugar de un map para agregar la condición de que si el count del item es igual a 0
		se elimine del carrito en el mismo bucle */
	const decreaseItemCount = (product: Product) => {
		setCart(
			cart.reduce((acc, el) => {
				if (el.product.id === product.id) {
					return el.count - 1 === 0 ? [...acc] : [...acc, { ...el, count: el.count - 1 }];
				}
				return [...acc, { ...el }];
			}, [] as CartItem[]),
		);
	};

	return (
		<CartContext.Provider
			value={{ cart, addToCart, deleteFromCart, increaseItemCount, decreaseItemCount }}
		>
			{children}
		</CartContext.Provider>
	);
}
