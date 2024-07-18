import { PricingFilter } from './PricingFilter';
import { SelectCategories } from './SelectCategories';

interface Props {
	categories: string[];
}

export function Filters({ categories }: Props) {
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
			<SelectCategories categories={categories} />
			<PricingFilter />
		</div>
	);
}
