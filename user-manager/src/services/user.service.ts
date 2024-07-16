import { User } from '../types/types';

type Filters = {
	limit?: number;
};

export async function findAll(filters: Filters) {
	const { limit } = filters;
	try {
		const response = await fetch(`https://randomuser.me/api/?results=${limit}`);

		if (response.ok) {
			const { results }: { results: User[] } = await response.json();
			return results;
		}
	} catch (error) {
		console.log('error', error);
	}
}
