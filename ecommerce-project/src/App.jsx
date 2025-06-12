import {Routes, Route} from 'react-router';
import { Homepage } from './pages/HomePage';
import {CheckoutPage} from './pages/checkout/CheckoutPage';
import {OrderPage} from './pages/OrderPage';
import { ErrorPage } from './pages/ErrorPage';
import './App.css'
import { TrackingPage } from './pages/TrackingPage';

function App() {
  return (
    <Routes>
      <Route index element = {<Homepage />} />
      <Route path= "checkout" element = {<CheckoutPage />} />
      <Route path="orders" element = {<OrderPage />} />
      <Route path = "tracking" element = {<TrackingPage />}/>
      <Route path = "*" element = {<ErrorPage />}/>
    </Routes>
  )
}

export default App
