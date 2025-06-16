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

  const [cart, setCart] = useState([]);

  useEffect (() => {
    const fetchAppData = async () => {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data)
    }
   
    fetchAppData()
  }, [])
  return (
    <Routes>
      <Route index element = {<Homepage cart = {cart}/>} />
      <Route path= "checkout" element = {<CheckoutPage cart = {cart}/>} />
      <Route path="orders" element = {<OrderPage cart = {cart}/>} />
      <Route path = "tracking" element = {<TrackingPage />}/>
      <Route path = "*" element = {<ErrorPage />}/>
    </Routes>
  )
}

export default App
