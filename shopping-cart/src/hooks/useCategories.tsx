import { useEffect, useState } from 'react';
import * as CategoryService from '../services/categories.service';

export function useCategories() {
	const [categories, setCategories] = useState<string[]>([]);

	useEffect(() => {
		CategoryService.findAll().then((response) => {
			if (response && response.length) {
				setCategories(response);
			}
		});
	}, []);

	return { categories };
}
