import axios from 'axios'
import dayjs from 'dayjs';
import { useState, useEffect } from 'react'
import { formatMoney } from '../../utils/money';
import './CheckoutHeader.css'
import './CheckoutPage.css'
import { CheckoutHeader } from './CheckoutHeader';


export function CheckoutPage({ cart }) {

	const [deliveryOptions, setDeliveryOptions] = useState([])

	useEffect(() => {
		axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
			.then((response) => {
				setDeliveryOptions(response.data)
			})
	}, [])
	return (
		<>
			<link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

			<title>Checkout</title>
			<CheckoutHeader />
			<div className="checkout-page">
				<div className="page-title">Review your order</div>

				<div className="checkout-grid">
					<div className="order-summary">
						{deliveryOptions.length > 0 && cart.map((cartItem) => {

							const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
								return deliveryOption.id === cartItem.deliveryOptionId
							})
							return (
								<div key={cartItem.productID} className="cart-item-container">
									<div className="delivery-date">
										Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
									</div>

									<div className="cart-item-details-grid">
										<img className="product-image"
											src={cartItem.product.image} />

										<div className="cart-item-details">
											<div className="product-name">
												{cartItem.product.name}
											</div>
											<div className="product-price">
												{formatMoney(cartItem.product.priceCents)}
											</div>
											<div className="product-quantity">
												<span>
													Quantity: <span className="quantity-label">{cartItem.quantity}</span>
												</span>
												<span className="update-quantity-link link-primary">
													Update
												</span>
												<span className="delete-quantity-link link-primary">
													Delete
												</span>
											</div>
										</div>

										<div className="delivery-options">
											<div className="delivery-options-title">
												Choose a delivery option:
											</div>

											{deliveryOptions.map((deliveryOption) => {

												let priceString = 'FREE Shipping';
												if (deliveryOption.priceCents > 0) {
													priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`
												}
												return (
													<div key = {deliveryOption.id} className="delivery-option">
														<input type="radio" 
															checked = {deliveryOption.id === cartItem.deliveryOptionId}
															className="delivery-option-input"
															name={`delivery-option-${cartItem.productId}`} />
														<div>
															<div className="delivery-option-date">
																{dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
															</div>
															<div className="delivery-option-price">
																{priceString}
															</div>
														</div>
													</div>
												)
											})}
										</div>
									</div>
								</div>
							)
						})}

					</div>

					<div className="payment-summary">
						<div className="payment-summary-title">
							Payment Summary
						</div>

						<div className="payment-summary-row">
							<div>Items (3):</div>
							<div className="payment-summary-money">$42.75</div>
						</div>

						<div className="payment-summary-row">
							<div>Shipping &amp; handling:</div>
							<div className="payment-summary-money">$4.99</div>
						</div>

						<div className="payment-summary-row subtotal-row">
							<div>Total before tax:</div>
							<div className="payment-summary-money">$47.74</div>
						</div>

						<div className="payment-summary-row">
							<div>Estimated tax (10%):</div>
							<div className="payment-summary-money">$4.77</div>
						</div>

						<div className="payment-summary-row total-row">
							<div>Order total:</div>
							<div className="payment-summary-money">$52.51</div>
						</div>

						<button className="place-order-button button-primary">
							Place your order
						</button>
					</div>
				</div>
			</div>
		</>

	);
}