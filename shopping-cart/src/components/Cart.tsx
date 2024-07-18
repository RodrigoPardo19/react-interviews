import { useContext, useState } from 'react';
import { CardItemCard } from './CartItemCard';
import { CartContext, CartContextType } from '../contexts/cart';
import { ProductsContext, ProductsContextType } from '../contexts/products';
import { CartItem, Product } from '../types/types';

export function Cart() {
	const { increaseStock, decreaseStock } = useContext(ProductsContext) as ProductsContextType;
	const { cart, increaseItemCount, decreaseItemCount, deleteFromCart } = useContext(
		CartContext,
	) as CartContextType;

	const [isOpen, setIsOpen] = useState(false);

	const openCart = () => {
		setIsOpen(true);
	};

	const closeCart = () => {
		setIsOpen(false);
	};

	const handleIncreaseItem = (product: Product) => {
		increaseItemCount(product);
		decreaseStock(product);
	};

	const handleDecreaseItem = (product: Product) => {
		decreaseItemCount(product);
		increaseStock(product);
	};

	const handleDeleteFromCart = (item: CartItem) => {
		const { product, count } = item;
		deleteFromCart(product);
		increaseStock(product, count);
	};

	const totalCart = cart.reduce((acc, el) => {
		const { count, product } = el;
		return acc + count * product.price;
	}, 0);

	return (
		<div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '4px',
				}}
			>
				<p style={{ fontWeight: 'bold', fontSize: '24px' }}>Carrito</p>
				<p style={{ fontWeight: 'bold', fontSize: '24px' }}>{cart.length}</p>
				<button
					style={{ backgroundColor: 'yellow', color: 'black', height: '50px' }}
					onClick={openCart}
				>
					{isOpen ? 'Ocultar' : 'Ver'} carrito
				</button>
			</div>
			{isOpen ? (
				<div className="modal">
					<div className="modal-content">
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<h2 style={{ margin: 0 }}>Tu Carrito</h2>
							<button style={{ alignSelf: 'end', backgroundColor: 'red' }} onClick={closeCart}>
								Cerrar
							</button>
						</div>
						{!cart.length ? (
							<p>No hay productos en tu carrito :C</p>
						) : (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '8px',
									alignItems: 'start',
								}}
							>
								{cart.map((el) => (
									<div
										key={el.product.title}
										style={{ display: 'flex', gap: '8px', alignItems: 'end' }}
									>
										<CardItemCard product={el.product} />
										<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
											<div>
												<p style={{ margin: '0' }}>Cantidad {el.count}</p>
												<div style={{ display: 'flex', gap: '4px' }}>
													<button style={{}} onClick={() => handleIncreaseItem(el.product)}>
														+
													</button>
													<button style={{}} onClick={() => handleDecreaseItem(el.product)}>
														-
													</button>
												</div>
											</div>
											<button
												style={{ backgroundColor: 'red', color: 'white' }}
												onClick={() => handleDeleteFromCart(el)}
											>
												Eliminar
											</button>
										</div>
									</div>
								))}
								<div style={{ fontSize: '30px', fontWeight: 'bold' }}>Total {totalCart} </div>
							</div>
						)}
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
