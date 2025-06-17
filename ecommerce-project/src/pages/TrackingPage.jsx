import { Header } from '../components/Header';
import { useParams } from 'react-router';
import { Link } from 'react-router';
import LogoWhite from '../assets/images/logo-white.png'
import MobileLogoWhite from '../assets/images/mobile-logo-white.png'
import SearchIcon from '../assets/images/icons/search-icon.png'
import CartIcon from '../assets/images/icons/cart-icon.png'
import './TrackingPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';


export function TrackingPage() {

	const {orderId, productId}= useParams()

	const [order, setOrder] = useState(null)

	useEffect(() => {
		const loadOrderData = async () => {
			const response = await axios.get(`/api/orders/${orderId}?expand=products`);
			setOrder(response.data)

		}
		loadOrderData()
	}, [orderId])

	if(!order){
		return null
	}

	const orderProduct = order.products.find((orderProduct) => {
		return orderProduct.productId = productId
	})

	const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
	const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
	let deliveryPercent = ((timePassedMs/totalDeliveryTimeMs) * 100)

	if(deliveryPercent > 100 ) {
		deliveryPercent = 100
	}

	const isPreparing = deliveryPercent < 33;
	const isShipped = (deliveryPercent >= 33 && deliveryPercent<100);
	const isDelivered = deliveryPercent === 100;

	return (
		<>
			<link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />

			<title>Tracking Page</title>

			<Header/>

			<div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
            src= {LogoWhite}/>
          <img className="mobile-logo"
            src={MobileLogoWhite} />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src= {SearchIcon}/>
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src= {CartIcon}/>
          <div className="cart-quantity">3</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>

    <div className="tracking-page">
      <div className="order-tracking">
        <Link className="back-to-orders-link link-primary" to="/orders">
          View all orders
        </Link>

        <div className="delivery-date">
         {deliveryPercent >=100 ? 'Delivered on' : 'Arriving on'} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
        </div>

        <div className="product-info">
          {orderProduct.product.name}
        </div>

        <div className="product-info">
          Quantity: {orderProduct.quantity}
        </div>

        <img className="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg" />

        <div className="progress-labels-container">
          <div className={`progress-label ${isPreparing &&'current-status'}`}>
            Preparing
          </div>
          <div className={`progress-label ${isShipped && 'current-status'}`}>
            Shipped
          </div>
          <div className={`progress-label ${isDelivered && 'current-status'}`}>
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
        </div>
      </div>
    </div>
		</>
		
	)
}