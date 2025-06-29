import axios from 'axios'
import { useState, useEffect } from 'react'
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutHeader.css'
import './CheckoutPage.css'
import { CheckoutHeader } from './CheckoutHeader';



export function CheckoutPage({ cart, loadCart }) {

	const [deliveryOptions, setDeliveryOptions] = useState([])
	const [paymentSummary, setPaymentSummary] = useState(null)

	useEffect(() => {
		const fetchCheckOutData = async () => {
			let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
			setDeliveryOptions(response.data);
		};
		fetchCheckOutData();
	}, []);

	useEffect(() => {
		const fetchPaymentSummary = async() => {
			 let response = await axios.get('/api/payment-summary');
			setPaymentSummary(response.data)
		}
		fetchPaymentSummary()
	}, [cart])
	return (
		<>
			<link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

			<title>Checkout</title>
			<CheckoutHeader />
			<div className="checkout-page">
				<div className="page-title">Review your order</div>

				<div className="checkout-grid">
					<OrderSummary cart = {cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>

					<PaymentSummary paymentSummary={paymentSummary} loadCart = {loadCart}/>
				</div>
			</div>
		</>

	);
}