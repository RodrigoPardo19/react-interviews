import { FiltersConfig } from '../types/types';
import { Button } from './Button';

interface Props {
	filters: FiltersConfig;
	printRows: () => void;
	sort: () => void;
	search: (value: string) => void;
	resetUsers: () => void;
}

export function Filters({ filters, printRows, sort, search, resetUsers }: Props) {
	return (
		<div style={{ display: 'flex', gap: '4px' }}>
			<Button title="Colorea filas" onClick={printRows} enable={filters.isColored} />
			<Button title="Ordena por país" onClick={sort} enable={filters.isSortedByCountry} />
			<Button title="Restaurar" onClick={resetUsers} />
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
				<label htmlFor="country" style={{ fontSize: '12px' }}>
					Filtrar por país
				</label>
				<input
					id="country"
					type="search"
					placeholder="Spain..."
					style={{ padding: '8px' }}
					onChange={(event) => search(event.target.value)}
				/>
			</div>
		</div>
	);
}
