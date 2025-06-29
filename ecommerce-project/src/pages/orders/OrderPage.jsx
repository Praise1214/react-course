import axios from 'axios';
import { useState, useEffect} from 'react'
import { Header } from '../../components/Header';
import { OrdersGrid } from './OrdersGrid';
import './OrderPage.css'

export function OrderPage({ cart, loadCart }) {
	const [orders, setOrders] = useState([])

	useEffect(() => {
		const getOrderData = async () => {
			const response = await axios.get('/api/orders?expand=products');
			setOrders(response.data)
		}
		
		getOrderData();
				
	}, [])

	return (
		<>
			<link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

			<title>Orders</title>
			<Header cart={cart} />

			<div className="orders-page">
				<div className="page-title">Your Orders</div>

				<OrdersGrid orders={orders} loadCart={loadCart}/>
			</div>
		</>
	)

}