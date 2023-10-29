import React from 'react'
import LogOut from '../../components/Website/LogOut'
import Cookie from 'cookie-universal'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const cookie = Cookie()
  const token = cookie.get("e-commerce")
  const date = new Date()
  console.log( Date())
  return (
    <div>
      {token ?<LogOut />:<Link to={"/login"}>login</Link>}
      <h1>Home page</h1>
      <span>nasiha<p>11111</p></span>
    </div>
  )
}

export default HomePage
