import React, { useContext } from 'react';
import { FiltersContext, FiltersContextType } from '../contexts/filters';

export function PricingFilter() {
	const { filterByPricing } = useContext(FiltersContext) as FiltersContextType;

	const handleMin = (event: React.ChangeEvent<HTMLInputElement>) => {
		const min = Number(event.target.value);
		if (min > 0 && !isNaN(min)) {
			filterByPricing({ min });
		}
	};

	const handleMax = (event: React.ChangeEvent<HTMLInputElement>) => {
		const max = Number(event.target.value);
		if (max > 0 && !isNaN(max)) {
			filterByPricing({ max });
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<label style={{ fontSize: '14px', textAlign: 'start' }} htmlFor="pricing-filter">
				Precio
			</label>
			<div style={{ display: 'flex', gap: '4px' }}>
				<input
					id="pricing-filter"
					name="min"
					type="number"
					placeholder="Mínimo"
					onChange={handleMin}
					style={{ height: '1rem', padding: '8px' }}
				/>
				<hr style={{ height: '0.9rem' }} />
				<input
					type="number"
					name="max"
					placeholder="Máximo"
					onChange={handleMax}
					style={{ height: '1rem', padding: '8px' }}
				/>
			</div>
		</div>
	);
}
