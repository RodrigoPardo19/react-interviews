import { useEffect, useRef, useState } from 'react';
import { User } from '../types/types';
import { findAll } from '../services/user.service';

export function useUsers({ limit = 10 }: { limit: number }) {
	const [users, setUsers] = useState<User[]>([]);
	const initialUsers = useRef<User[]>([]);

	useEffect(() => {
		findAll({ limit }).then((response) => {
			if (response) {
				setUsers([...response]);
				initialUsers.current = [...response];
			}
		});
	}, []);

	const deleteUser = (email: string) => {
		setUsers((users) => {
			return users.filter((el) => el.email !== email);
		});
	};

	const resetUsers = () => {
		setUsers([...initialUsers.current]);
	};

	return { users, initialUsers, deleteUser, resetUsers };
}
