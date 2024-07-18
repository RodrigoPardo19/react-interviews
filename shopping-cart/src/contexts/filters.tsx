import { createContext, ReactNode, useState } from 'react';
import { FiltersConfig, INITIAL_CATEGORY } from '../types/types';

export interface FiltersContextType {
	filters: FiltersConfig;
	filterByCategory: (category: string) => void;
	filterByPricing: (pricing: { min?: number; max?: number }) => void;
}

interface ProviderProps {
	children: ReactNode;
}

export const FiltersContext = createContext<FiltersContextType | null>(null);

export function FiltersProvider({ children }: ProviderProps) {
	const [filters, setFilters] = useState<FiltersConfig>({
		category: INITIAL_CATEGORY,
		pricing: { min: 0, max: 0 },
	});

	const filterByCategory = (category: string) => {
		setFilters({ ...filters, category: category });
	};

	const filterByPricing = (pricing: { min?: number; max?: number }) => {
		const { min, max } = pricing;
		if (min !== undefined && min >= 0) {
			setFilters({ ...filters, pricing: { min, max: filters.pricing.max } });
		}
		if (max !== undefined && max >= 0) {
			setFilters({ ...filters, pricing: { max, min: filters.pricing.min } });
		}
	};

	return (
		<FiltersContext.Provider value={{ filters, filterByCategory, filterByPricing }}>
			{children}
		</FiltersContext.Provider>
	);
}
