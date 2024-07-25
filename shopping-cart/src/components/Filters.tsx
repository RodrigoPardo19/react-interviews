import { PricingFilter } from './PricingFilter';
import { SelectCategories } from './SelectCategories';

export function Filters() {
	return (
		<div
			style={{
				display: 'flex',
				gap: '8px',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
			}}
		>
			<SelectCategories />
			<PricingFilter />
		</div>
	);
}
