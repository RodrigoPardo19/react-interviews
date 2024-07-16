import { FiltersConfig, User } from '../types/types';
import { Button } from './Button';

interface Props {
	users: User[];
	filters: FiltersConfig;
	deleteUser: (email: string) => void;
	sort: () => void;
}

export function UserTable({ users, filters, deleteUser, sort }: Props) {
	const { isColored } = filters;

	if (!users.length) {
		return (
			<div>
				<p>No data</p>
			</div>
		);
	}

	return (
		<table>
			<thead>
				<tr>
					<th>photo</th>
					<th>name</th>
					<th>apellido</th>
					<th style={{ cursor: 'pointer' }} onClick={sort}>
						country ⬇️
					</th>
				</tr>
			</thead>
			<tbody>
				{users.map((el, index) => (
					<tr
						key={el.email}
						style={isColored ? { backgroundColor: index % 2 === 0 ? '#323232' : '#434343' } : {}}
					>
						<td>
							<img src={el.picture.thumbnail} />
						</td>
						<td>{el.name.first}</td>
						<td>{el.name.last}</td>
						<td>{el.location.country}</td>
						<td>
							<Button title="delete" onClick={() => deleteUser(el.email)} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
