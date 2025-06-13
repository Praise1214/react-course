import axios from 'axios';
import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router';
import { Homepage } from './pages/HomePage';
import {CheckoutPage} from './pages/checkout/CheckoutPage';
import {OrderPage} from './pages/OrderPage';
import { ErrorPage } from './pages/ErrorPage';
import './App.css'
import { TrackingPage } from './pages/TrackingPage';

function App() {

  const [cart, setCart] = useState([]);

  useEffect (() => {
    axios.get('/api/cart-items').then((response) => {
			setCart(response.data)
		})
  }, [])
  return (
    <Routes>
      <Route index element = {<Homepage cart = {cart}/>} />
      <Route path= "checkout" element = {<CheckoutPage cart = {cart}/>} />
      <Route path="orders" element = {<OrderPage />} />
      <Route path = "tracking" element = {<TrackingPage />}/>
      <Route path = "*" element = {<ErrorPage />}/>
    </Routes>
  )
}

export default App
