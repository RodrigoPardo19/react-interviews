import { Product } from '../types/types';

interface Props {
	product: Product;
}

export function CardItemCard({ product }: Props) {
	return (
		<div
			id="cart-item"
			role="listitem"
			aria-label="cart-item"
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
				padding: '12px',
				border: '1px solid #5B5B5B',
				width: '10rem',
			}}
		>
			<img src={product.thumbnail} alt={product.title ?? 'product item'} />
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
				<p data-testid="cart-item-brand" style={{ margin: '0px' }}>
					{product.brand}
				</p>
				<p
					data-testid="cart-item-title"
					style={{ margin: '0px', textAlign: 'start', fontWeight: 'bold', fontSize: '18px' }}
				>
					{product.title}
				</p>
				<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
					<p
						data-testid="cart-item-price"
						style={{ margin: '0px', fontWeight: 'bold', fontSize: '24px' }}
					>
						${product.price}
					</p>
				</div>
			</div>
		</div>
	);
}
