import axios from 'axios'
import { useEffect, useState} from 'react';
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid';
import './Homepage.css'

export function Homepage({cart}) {

	const [products, setProducts] = useState([]);
	
 
	useEffect(() => {
		const getHomeData = async () => {
			const response = await axios.get('/api/products');
			setProducts(response.data)

		}

		getHomeData()
			
	}, [])
	
	return (
		<>
			<link rel="icon" type="image/svg+xml" href="home-favicon.png" />

			<title>Ecommerce Project</title>

			<Header cart = {cart}/>

			<div className="home-page">
				<ProductsGrid products = {products}/>
			</div>
		</>
	);
}