import axios from 'axios';
import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router';
import { Homepage } from './pages/home/HomePage';
import {CheckoutPage} from './pages/checkout/CheckoutPage';
import {OrderPage} from './pages/orders/OrderPage';
import { ErrorPage } from './pages/ErrorPage';
import './App.css'
import { TrackingPage } from './pages/TrackingPage';

function App() {

  window.axios =  axios

  const [cart, setCart] = useState([]);

  const loadCart = async () => {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data)
    }
   

  useEffect (() => {
    loadCart()
  }, [])
  return (
    <Routes>
      <Route index element = {<Homepage cart = {cart} loadCart={loadCart}/>} />
      <Route path= "checkout" element = {<CheckoutPage cart = {cart} loadCart={loadCart}/>} />
      <Route path="orders" element = {<OrderPage cart = {cart} loadCart={loadCart}/>} />
      <Route path = "tracking/:orderId/:productId" element = {<TrackingPage cart={cart}/>}/>
      <Route path = "*" element = {<ErrorPage cart={cart}/>}/>
    </Routes>
  )
}

export default App
