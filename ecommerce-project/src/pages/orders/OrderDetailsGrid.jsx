import axios from "axios";
import { Fragment } from "react";
import dayjs from "dayjs";
import { Link } from "react-router";
import BuyAgainIcon from '../../assets/images/icons/buy-again.png';

export function OrderDetailsGrid({ order, loadCart }) {

	
	return (
		<div className="order-details-grid">
			{order.products.map((orderProduct) => {

			const addToCart = async () => {
				await axios.post('/api/cart-items', {
					productId : orderProduct.product.id,
					quantity: orderProduct.quantity
				})
				await loadCart()
			}
				return (
					<Fragment key={orderProduct.product.id}>
						<div className="product-image-container">
							<img src={orderProduct.product.image} />
						</div>

						<div className="product-details">
							<div className="product-name">
								{orderProduct.product.name}
							</div>
							<div className="product-delivery-date">
								Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
							</div>
							<div className="product-quantity">
								Quantity: {orderProduct.quantity}
							</div>
							<button className="buy-again-button button-primary">
								<img className="buy-again-icon" src={BuyAgainIcon} />
								<span className="buy-again-message" onClick={addToCart}>Add to Cart</span>
							</button>
						</div>

						<div className="product-actions">
							<Link to= {`/tracking/${order.id}/${orderProduct.productId}`}>
								<button className="track-package-button button-secondary">
									Track package
								</button>
							</Link>
						</div>
					</Fragment>
				)
			})}
		</div>
	)
}