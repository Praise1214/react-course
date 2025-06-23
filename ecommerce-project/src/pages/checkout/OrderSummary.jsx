import { DeliverOptions } from "./DeliveryOptions";
import { CartItemsDetails } from "./CartItemsDetails";
import { DeliveryDate } from "./DeliveryDate";

export function OrderSummary({deliveryOptions, cart, loadCart}) {
	return (
		<div className="order-summary">
			{deliveryOptions.length > 0 && cart.map((cartItem) => {

				const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
					return deliveryOption.id === cartItem.deliveryOptionId
				})
				return (
					<div key={cartItem.productId} className="cart-item-container">
						<DeliveryDate  selectedDeliveryOption={selectedDeliveryOption}/>
						<div className="cart-item-details-grid">
							<CartItemsDetails cartItem={cartItem}/>

							<DeliverOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart = {loadCart}/>
						</div>
					</div>
				)
			})}

		</div>
	)
}