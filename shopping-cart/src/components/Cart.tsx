import { useContext, useMemo, useState } from 'react';
import { CardItemCard } from './CartItemCard';
import { CartContext, CartContextType } from '../contexts/cart';

export function Cart() {
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

	const totalItems = useMemo(() => {
		return cart.reduce((acc, el) => {
			const { count, product } = el;
			return acc + count * product.price;
		}, 0);
	}, [cart]);

	return (
		<div id="cart" aria-label="cart">
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
					aria-label="show-cart"
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
							<p data-testid="cart-no-items" role="status">
								No hay productos en tu carrito :C
							</p>
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
										id="cart-items"
										key={el.product.title}
										style={{ display: 'flex', gap: '8px', alignItems: 'end' }}
									>
										<CardItemCard product={el.product} />
										<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
											<div>
												<p data-testid="cart-item-count" style={{ margin: '0' }}>
													Cantidad {el.count}
												</p>
												<div style={{ display: 'flex', gap: '4px' }}>
													<button
														aria-label="increase-item-count"
														onClick={() => increaseItemCount(el.product)}
													>
														+
													</button>
													<button
														aria-label="decrease-item-count"
														onClick={() => decreaseItemCount(el.product)}
													>
														-
													</button>
												</div>
											</div>
											<button
												aria-label="delete-from-cart"
												style={{ backgroundColor: 'red', color: 'white' }}
												onClick={() => deleteFromCart(el)}
											>
												Eliminar
											</button>
										</div>
									</div>
								))}
								<div style={{ fontSize: '30px', fontWeight: 'bold' }}>Total {totalItems} </div>
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
