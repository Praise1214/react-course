import {Routes, Route} from 'react-router';
import { Homepage } from './pages/HomePage';
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element = {<Homepage />} />
      <Route path= "checkout" element = {<div>testing 1 2 1 2</div>} />
    </Routes>
  )
}

export default App
