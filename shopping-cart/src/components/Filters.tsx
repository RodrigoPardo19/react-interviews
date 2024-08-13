import { PricingFilter } from './PricingFilter';
import { SelectCategories } from './SelectCategories';

export function Filters() {
	return (
		<form
			id="filters-form"
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
		</form>
	);
}
