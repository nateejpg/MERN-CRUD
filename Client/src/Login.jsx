import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import React, {useState} from 'react'
import axios from "axios"

export const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleLogin = () => {

    axios.post('http://localhost:3001/login', {email, password})

    .then(res => {

      if(res.data.success){

        alert('Login Successful!')

        localStorage.setItem('userId', res.data.userId)
        localStorage.setItem('username', res.data.username)

        navigate('/');

      }else{
     
        alert('Invalid Credentials!')

      }
    })
    .catch(() => {

      alert('There was an error, please try again!');

    })
  }

  return (
    <div>
      <Link to={'/Register'}><p>Register</p></Link>
      <Link to={'/'}><p>Home</p></Link>
        <h1>Login</h1>
        <input type='text' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)}/>
        <input type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleLogin}>Send</button>
    </div>
  )
}
