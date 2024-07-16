interface Props {
	title: string;
	enable?: boolean;
	onClick?: () => void;
}
export function Button({ title, onClick, enable = false }: Props) {
	return (
		<button className={enable ? 'active-button' : ''} onClick={onClick}>
			{title}
		</button>
	);
}
