import './App.css';
import { UserTable } from './components/UserTable';
import { Filters } from './components/Filters';
import { useUsers } from './hooks/useUsers';
import { useFilters } from './hooks/useFilters';
import { useMemo } from 'react';

function App() {
	const { users, deleteUser, resetUsers } = useUsers({ limit: 5 });
	const { filters, printRows, sort, search } = useFilters();

	const filteredUsers = filters.isSortedByCountry
		? users.filter((el) => el.location.country.toLowerCase().includes(filters.search.toLowerCase()))
		: users;

	const sortedUsers = useMemo(() => {
		return filters.isSortedByCountry
			? [...filteredUsers].sort((a, b) => a.location.country.localeCompare(b.location.country))
			: filteredUsers;
	}, [filters.isSortedByCountry, filteredUsers]);

	return (
		<>
			<header>
				<h1>Lista de usuarios</h1>
			</header>
			<main>
				<Filters
					filters={filters}
					printRows={printRows}
					sort={sort}
					search={search}
					resetUsers={resetUsers}
				/>
				<UserTable users={sortedUsers} filters={filters} deleteUser={deleteUser} sort={sort} />
			</main>
		</>
	);
}

export default App;
