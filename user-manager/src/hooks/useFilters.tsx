import { useState } from 'react';
import { FiltersConfig } from '../types/types';

export function useFilters() {
	const [filters, setFilters] = useState<FiltersConfig>({
		isColored: false,
		isSortedByCountry: false,
		search: '',
	});

	const sort = () => {
		setFilters((current) => {
			return { ...current, isSortedByCountry: !current.isSortedByCountry };
		});
	};

	const printRows = () => {
		setFilters((el: FiltersConfig) => {
			return { ...el, isColored: !el.isColored };
		});
	};

	const search = (newValue: string) => {
		setFilters((el) => {
			return { ...el, search: newValue };
		});
	};

	return { filters, sort, printRows, search };
}
