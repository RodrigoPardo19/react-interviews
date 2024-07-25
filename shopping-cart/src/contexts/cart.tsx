import { createContext, ReactNode, useEffect, useState } from 'react';
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

interface CartProviderProps {
	children: ReactNode;
}

export const CartContext = createContext<CartContextType | null>(null);

// useContext vs customHooks vs Composition | useReducer vs useState | useMemo and useCallback when use them
// the cart and products states should be together? they are in sync actually
// Suppose that we want reuse Products from the server in different parts of the UI (por these problem custom hooks should be work's fine)
// should i use useCallback o useMemo in context providers?
export function CartProvider({ children }: CartProviderProps) {
	const [products, setProducts] = useState<Product[]>([]);
	const [cart, setCart] = useState<CartItem[]>([]);

	const fetchCart = async () => {
		// Si descomentamos esta línea entonces podemos probar que el useEffect comentado de la línea 59 setea el cart con un arreglo vacío
		// await new Promise((resolve) => setTimeout(resolve, 2000));
		const item: CartItem[] = JSON.parse(localStorage.getItem('cart') ?? '[]');
		setCart(item);
		return item;
	};

	const fetchProducts = async () => {
		return ProductService.findAll().then((response) => {
			if (response) {
				return response;
			}
			return [];
		});
	};

	useEffect(() => {
		Promise.all([fetchCart(), fetchProducts()]).then(([cartData, productsData]) => {
			setProducts(
				productsData.map((el) => {
					const item = cartData.find((c) => c.product.id === el.id);
					return item ? { ...el, stock: el.stock - item.count } : { ...el };
				}),
			);
		});
	}, []);

	/* Esta podría haber sido otra forma de actualizar el localStorage, sin embargo decidí no utilizarla debido
	a que puede traer bugs dependiendo de cuanto se demore en cargar la función fetchCart,
	además de que los useEffect son más dificil de controlar por los sideEffects que pueden gatillarlo */
	// useEffect(() => {
	// 	localStorage.setItem('cart', JSON.stringify(cart));
	// }, [cart])

	const saveInLocalStorage = (cart: CartItem[]) => {
		localStorage.setItem('cart', JSON.stringify(cart));
	};

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

	const addToCart = (newProduct: Product) => {
		if (cart.some((el) => el.product?.id === newProduct?.id)) {
			setCart((curr) => {
				const updated = curr.map((el) => {
					if (el.product.id === newProduct.id) return { ...el, count: el.count + 1 };
					return { ...el };
				});
				saveInLocalStorage(updated);
				return updated;
			});
		} else {
			setCart((curr) => {
				const updated = [...curr, { count: 1, product: { ...newProduct } }];
				saveInLocalStorage(updated);
				return updated;
			});
		}
		decreaseStock(newProduct);
	};

	const deleteFromCart = (item: CartItem) => {
		const { product, count } = item;
		setCart((curr) => {
			const updated = curr.filter((el) => el.product.id !== product.id);
			saveInLocalStorage(updated);
			return updated;
		});
		increaseStock(product, count);
	};

	const increaseItemCount = (product: Product) => {
		setCart((curr) => {
			const updated = curr.map((el) => {
				if (el.product.id === product.id) {
					return { ...el, count: el.count + 1 };
				}
				return { ...el };
			});
			saveInLocalStorage(updated);
			return updated;
		});
		decreaseStock(product);
	};

	/* Acá utilicé un reduce el lugar de un map para agregar la condición de que si el count del item es igual a 0
	se elimine del carrito en el mismo bucle, de otra forma tendría que haber hecho 2 iteraciones, una con map y luego un filter */
	const decreaseItemCount = (product: Product) => {
		setCart((curr) => {
			const updated = curr.reduce((acc, el) => {
				if (el.product.id === product.id) {
					return el.count - 1 === 0 ? [...acc] : [...acc, { ...el, count: el.count - 1 }];
				}
				return [...acc, { ...el }];
			}, [] as CartItem[]);
			saveInLocalStorage(updated);
			return updated;
		});
		increaseStock(product);
	};

	return (
		<CartContext.Provider
			value={{ cart, products, addToCart, deleteFromCart, increaseItemCount, decreaseItemCount }}
		>
			{children}
		</CartContext.Provider>
	);
}
