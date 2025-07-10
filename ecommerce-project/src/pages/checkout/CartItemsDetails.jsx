import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemsDetails({cartItem, loadCart}) {

	const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false)
	const [quantity, setQuantity] = useState(cartItem.quantity)

	const deleteCartItem = async () => {
		await axios.delete(`/api/cart-items/${cartItem.productId}`);
		await loadCart()
	}

	const updateCartQuantity = async () => {
		await axios.put(`/api/cart-items/${cartItem.productId}`, {
			quantity
		})
		await loadCart()
	}

	const updateQuantity = () => {
		if (isUpdatingQuantity) {
			updateCartQuantity()
			setIsUpdatingQuantity(false)
		}

		else {
			setIsUpdatingQuantity(true)
		}
	}
	return (
		<>
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
						Quantity: {isUpdatingQuantity 
						? <input 
								value = {quantity}
								onChange={(e) => {
									setQuantity(Number(e.target.value))
								}}
								onKeyDown={(event) => {
									if(event.key === 'Enter') {
										updateCartQuantity()
									}

									else if(event.key === 'Escape') {
										setIsUpdatingQuantity(false)
									}
								}}
								type="text"className="quantity-textbox"/> 
						: <span className="quantity-label">{cartItem.quantity}</span>
					}	
					</span>
					<span className="update-quantity-link link-primary" onClick={updateQuantity}>
						Update
					</span>
					<span className="delete-quantity-link link-primary" onClick = {deleteCartItem}>
						Delete
					</span>
				</div>
			</div>
		</>
	)
}