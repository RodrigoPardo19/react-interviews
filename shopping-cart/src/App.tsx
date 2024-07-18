import { Products } from './components/Products.tsx';
import { Filters } from './components/Filters.tsx';
import { useCategories } from './hooks/useCategories.tsx';
import { FiltersProvider } from './contexts/filters.tsx';
import { Cart } from './components/Cart.tsx';
import './App.css';
import { ProductsProvider } from './contexts/products.tsx';

function App() {
	const { categories } = useCategories();

	return (
		<>
			<header>
				<h1>Shopping Cart</h1>
			</header>
			<main>
				<ProductsProvider>
					<FiltersProvider>
						<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
							<Filters categories={categories} />
							<Cart />
						</div>
						<Products />
					</FiltersProvider>
				</ProductsProvider>
			</main>
		</>
	);
}

export default App;
