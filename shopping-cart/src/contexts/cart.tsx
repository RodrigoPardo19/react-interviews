import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { CartItem, Product } from '../types/types';
import * as ProductService from '../services/product.service';

export interface CartContextType {
	cart: CartItem[];
	products: Product[];
	addToCart: (product: Product) => void;
	deleteFromCart: (item: CartItem) => void;
	increaseItemCount: (product: Product) => void;
	decreaseItemCount: (product: Product) => void;
}

interface CartReducer {
	cart: CartItem[];
	products: Product[];
}

type Action =
	| { type: 'INIT_PRODUCTS'; products: Product[] }
	| { type: 'ADD_TO_CART' | 'INCREASE_ITEM_COUNT' | 'DECREASE_ITEM_COUNT'; product: Product }
	| { type: 'DELETE_FROM_CART'; item: CartItem };

export const CartContext = createContext<CartContextType | null>(null);

const getCartFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem('cart') ?? '[]');
};

const increaseStock = (products: Product[], product: Product, count?: number) => {
	if (products.some((el) => el.id === product.id)) {
		return products.map((el) => {
			return el.id === product.id ? { ...el, stock: el.stock + (count ?? 1) } : { ...el };
		});
	}

	return [...products, { ...product, stock: count ?? 1 }];
};

const decreaseStock = (products: Product[], product: Product) => {
	return products.reduce((acc, el) => {
		if (el.id === product.id) {
			return el.stock - 1 === 0 ? [...acc] : [...acc, { ...el, stock: el.stock - 1 }];
		}
		return [...acc, { ...el }];
	}, [] as Product[]);
};

function cartReducer(state: CartReducer, action: Action) {
	const { type } = action;
	const { cart, products } = state;

	switch (type) {
		case 'INIT_PRODUCTS': {
			return {
				cart: [...cart],
				products: action.products.map((el) => {
					const item = cart.find((c) => c.product.id === el.id);
					return item ? { ...el, stock: el.stock - item.count } : { ...el };
				}),
			};
		}
		case 'ADD_TO_CART': {
			if (cart.some((el) => el.product?.id === action.product?.id)) {
				return {
					cart: cart.map((el) => {
						return el.product.id === action.product.id ? { ...el, count: el.count + 1 } : { ...el };
					}),
					products: decreaseStock(products, action.product),
				};
			} else {
				return {
					cart: [...cart, { count: 1, product: { ...action.product } }],
					products: decreaseStock(products, action.product),
				};
			}
		}
		case 'DELETE_FROM_CART': {
			const { item } = action;
			const { product, count } = item;
			return {
				cart: cart.filter((el) => el.product.id !== product.id),
				products: increaseStock(products, product, count),
			};
		}
		case 'INCREASE_ITEM_COUNT': {
			const { product } = action;
			return {
				cart: cart.map((el) => {
					if (el.product.id === product.id) {
						return { ...el, count: el.count + 1 };
					}
					return { ...el };
				}),
				products: decreaseStock(products, product),
			};
		}
		case 'DECREASE_ITEM_COUNT': {
			const { product } = action;
			return {
				cart: cart.reduce((acc, el) => {
					if (el.product.id === product.id) {
						return el.count - 1 === 0 ? [...acc] : [...acc, { ...el, count: el.count - 1 }];
					}
					return [...acc, { ...el }];
				}, [] as CartItem[]),
				products: increaseStock(products, product),
			};
		}
	}
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, { cart: [], products: [] }, () => {
		return { cart: getCartFromLocalStorage(), products: [] };
	});

	useEffect(() => {
		ProductService.findAll().then((response) => {
			if (response) {
				dispatch({ type: 'INIT_PRODUCTS', products: response });
			}
		});
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state.cart));
	}, [state.cart]);

	const addToCart = (product: Product) => {
		dispatch({ type: 'ADD_TO_CART', product });
	};

	const deleteFromCart = (item: CartItem) => {
		dispatch({ type: 'DELETE_FROM_CART', item });
	};

	const increaseItemCount = (product: Product) => {
		dispatch({ type: 'INCREASE_ITEM_COUNT', product });
	};

	const decreaseItemCount = (product: Product) => {
		dispatch({ type: 'DECREASE_ITEM_COUNT', product });
	};

	return (
		<CartContext.Provider
			value={{
				cart: state.cart,
				products: state.products,
				addToCart,
				deleteFromCart,
				increaseItemCount,
				decreaseItemCount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
