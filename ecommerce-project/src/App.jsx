import {Routes, Route} from 'react-router';
import { Homepage } from './pages/HomePage';
import {CheckoutPage} from './pages/checkout/CheckoutPage';
import {OrderPage} from './pages/OrderPage';
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element = {<Homepage />} />
      <Route path= "checkout" element = {<CheckoutPage />} />
      <Route path="orders" element = {<OrderPage />} />
    </Routes>
  )
}

export default App
