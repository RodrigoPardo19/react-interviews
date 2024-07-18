import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './contexts/cart.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<CartProvider>
		<App />
	</CartProvider>,
);
