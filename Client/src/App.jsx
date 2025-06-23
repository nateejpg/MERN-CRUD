import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Register from './Register'
import { Login } from './Login'
import Home from './Home'

function App() {

  return (
   <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
    </Routes>
   </Router>
  )
}

export default App
