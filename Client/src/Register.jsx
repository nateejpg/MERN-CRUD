import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const Navigate = useNavigate();

  console.log(username, email, password)

  const HandleRegister = () => {

    axios.post('http://localhost:3001/register', {username: username, email: email, password: password})
    .then(result => {
      alert('Registration successful! You can now log in!')
      Navigate('/Login')
    })
    .catch(err => {
      alert('There was an error, please try again!')
    })

  }

  return (

    <div>
        <Link to={'/'}><p>Home</p></Link>
        <Link to={'/Login'}>Login</Link>
        <h1>Register</h1>
        <input type='text' placeholder='Enter your username' onChange={(e) => setUsername(e.target.value)}/>
        <input type='text' placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)}/>
        <input type='password' placeholder='Enter your Password' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={HandleRegister}>Send</button>

    </div>
  )
}

export default Register