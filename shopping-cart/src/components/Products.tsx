import { INITIAL_CATEGORY, Product } from '../types/types';
import { ProductCard } from './ProductCard';
import { FiltersContext, FiltersContextType } from '../contexts/filters';
import { CartContext, CartContextType } from '../contexts/cart';
import { useContext } from 'react';

const filterByPrincing = (princing: { min?: number; max?: number }, products: Product[]) => {
	const { min, max } = princing;
	if (min && max) {
		return products.filter((el) => el.price >= min && el.price <= max);
	}
	if (min) {
		return products.filter((el) => el.price >= min);
	}
	if (max) {
		return products.filter((el) => el.price <= max);
	}
	return products;
};

export function Products() {
	const { products } = useContext(CartContext) as CartContextType;
	const { filters } = useContext(FiltersContext) as FiltersContextType;

	const { pricing, category } = filters;

	const filteredByCategory =
		category && category !== INITIAL_CATEGORY
			? products.filter((el) => el?.category === category)
			: products;

	const filteredByPricing = filterByPrincing(pricing, filteredByCategory);

	if (!filteredByPricing.length) {
		return (
			<div>
				<p>No data</p>
			</div>
		);
	}

	return (
		<div>
			<p>Total: {filteredByPricing.length}</p>

			<div
				role="list"
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(5, 1fr)',
					gap: '8px',
					padding: '8px',
				}}
			>
				{filteredByPricing.map((el) => (
					<ProductCard key={el.id} product={el} />
				))}
			</div>
		</div>
	);
}
