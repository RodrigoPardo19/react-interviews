import React from 'react';
import { FiltersConfig } from '../types/types';
import { Button } from './Button';

interface Props {
	filters: FiltersConfig;
	setFilters: React.Dispatch<React.SetStateAction<FiltersConfig>>;
	resetUsers: () => void;
}

export function Filters({ filters, setFilters, resetUsers }: Props) {
	const switchRowColors = () => {
		setFilters((el: FiltersConfig) => {
			return { ...el, isColored: !el.isColored };
		});
	};

	const sortByCountry = () => {
		setFilters((el: FiltersConfig) => {
			return { ...el, isSortedByCountry: !el.isSortedByCountry };
		});
	};

	const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilters((el) => {
			return { ...el, search: event.target.value };
		});
	};

	return (
		<div style={{ display: 'flex', gap: '4px' }}>
			<Button title="Colorea filas" onClick={switchRowColors} enable={filters.isColored} />
			<Button title="Ordena por país" onClick={sortByCountry} enable={filters.isSortedByCountry} />
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
					onChange={changeSearch}
				/>
			</div>
		</div>
	);
}
