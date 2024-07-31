import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PricingFilter } from '../components/PricingFilter';
import { FiltersProvider } from '../contexts/filters';

describe('Pricing Filter Component', () => {
	it('Se muestra el precio correspondiente', () => {
		render(
			<FiltersProvider>
				<PricingFilter />
			</FiltersProvider>,
		);

		expect(screen.getByText('Precio').textContent).toBe('Precio');
	});
});
