import { useState, useEffect, useRef } from 'react';
import './App.css';
import { findAll } from './services/user.service';
import { FiltersConfig, User } from './types/types';
import { UserTable } from './components/UserTable';
import { Filters } from './components/Filters';

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const initialUsers = useRef<User[]>([]);
	const [filters, setFilters] = useState<FiltersConfig>({
		isColored: false,
		isSortedByCountry: false,
		search: '',
	});

	useEffect(() => {
		findAll({ limit: 10 }).then((response) => {
			if (response) {
				setUsers([...response]);
				initialUsers.current = [...response];
			}
		});
	}, []);

	const sortedUsers = filters.isSortedByCountry
		? users
			.filter((el) => el.location.country.toLowerCase().includes(filters.search.toLowerCase()))
			.sort((a, b) => a.location.country.localeCompare(b.location.country))
		: users.filter((el) =>
			el.location.country.toLowerCase().includes(filters.search.toLowerCase()),
		);

	const deleteUser = (email: string) => {
		setUsers((users) => {
			return users.filter((el) => el.email !== email);
		});
	};

	const resetUsers = () => {
		setUsers([...initialUsers.current]);
	};

	return (
		<>
			<header>
				<h1>Lista de usuarios</h1>
			</header>
			<main>
				<Filters filters={filters} setFilters={setFilters} resetUsers={resetUsers} />
				<UserTable users={sortedUsers} filters={filters} deleteUser={deleteUser} />
			</main>
		</>
	);
}

export default App;
