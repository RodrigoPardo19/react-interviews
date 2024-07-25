import { Products } from './components/Products.tsx';
import { Filters } from './components/Filters.tsx';
import { FiltersProvider } from './contexts/filters.tsx';
import { Cart } from './components/Cart.tsx';
import { CartProvider } from './contexts/cart.tsx';
import './App.css';

function App() {
	return (
		<>
			<header>
				<h1>Shopping Cart</h1>
			</header>
			<main>
				<CartProvider>
					<FiltersProvider>
						<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
							<Filters />
							<Cart />
						</div>
						<Products />
					</FiltersProvider>
				</CartProvider>
			</main>
		</>
	);
}

export default App;
