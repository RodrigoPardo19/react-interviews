import { useContext } from 'react';
import { Product } from '../types/types';
import { CartContext, CartContextType } from '../contexts/cart';
import { ProductsContext, ProductsContextType } from '../contexts/products';

interface Props {
	product: Product;
}

export function ProductCard({ product }: Props) {
	const { decreaseStock } = useContext(ProductsContext) as ProductsContextType;
	const { addToCart } = useContext(CartContext) as CartContextType;

	const handleAddToCart = (product: Product) => {
		addToCart(product);
		decreaseStock(product);
	};

	return (
		<div
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
					<p style={{ margin: '0px' }}>{product.brand}</p>
					<p style={{ margin: '0px', border: '1px solid #5B5B5B', padding: '2px 2rem' }}>
						stock <strong>{product.stock}</strong>
					</p>
				</div>
				<p style={{ margin: '0px', textAlign: 'start', fontWeight: 'bold', fontSize: '18px' }}>
					{product.title}
				</p>
				<p style={{ margin: '0px', textAlign: 'start' }}>{product.description}</p>
				<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
					<p style={{ margin: '0px', fontWeight: 'bold', fontSize: '24px' }}>${product.price}</p>
					<button
						style={{ backgroundColor: 'white', color: 'black' }}
						onClick={() => handleAddToCart(product)}
					>
						Agregar
					</button>
				</div>
			</div>
		</div>
	);
}
