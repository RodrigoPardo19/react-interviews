import { useContext } from 'react';
import { FiltersContext, FiltersContextType } from '../contexts/filters';

interface Props {
	categories: string[];
}

export function SelectCategories({ categories }: Props) {
	const { filters, filterByCategory } = useContext(FiltersContext) as FiltersContextType;

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<label style={{ fontSize: '14px', textAlign: 'start' }} htmlFor="category-filter">
				Categorías
			</label>
			<select
				id="category-filter"
				value={filters.category}
				onChange={(event) => filterByCategory(event.target.value)}
				style={{ padding: '8px' }}
			>
				{categories.map((el) => (
					<option key={el} value={el}>
						{el}
					</option>
				))}
			</select>
		</div>
	);
}
