import { useContext } from 'react';
import { Product } from '../types/types';
import { CartContext, CartContextType } from '../contexts/cart';

interface Props {
	product: Product;
}

export function ProductCard({ product }: Props) {
	const { addToCart } = useContext(CartContext) as CartContextType;

	return (
		<div
			id="product-item"
			role="listitem"
			aria-label="product-item"
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
				padding: '12px',
				border: '1px solid #5B5B5B',
			}}
		>
			<img src={product.thumbnail} alt={product.title ?? 'product item'} />
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
				<div
					style={{
						display: 'flex',
						width: '100%',
						gap: '4px',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<p id="product-brand" style={{ margin: '0px' }}>
						{product.brand}
					</p>
					<p
						data-testid="product-stock"
						style={{ margin: '0px', border: '1px solid #5B5B5B', padding: '2px 2rem' }}
					>
						stock <strong>{product.stock}</strong>
					</p>
				</div>
				<p
					id="product-title"
					style={{ margin: '0px', textAlign: 'start', fontWeight: 'bold', fontSize: '18px' }}
				>
					{product.title}
				</p>
				<p id="product-description" style={{ margin: '0px', textAlign: 'start' }}>
					{product.description}
				</p>
				<p id="product-category" hidden>
					{product.category}
				</p>
				<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
					<p id="product-price" style={{ margin: '0px', fontWeight: 'bold', fontSize: '24px' }}>
						${product.price}
					</p>
					<button
						name="add-to-cart"
						aria-label="add-to-cart"
						style={{ backgroundColor: 'white', color: 'black' }}
						onClick={() => addToCart(product)}
					>
						Agregar
					</button>
				</div>
			</div>
		</div>
	);
}
