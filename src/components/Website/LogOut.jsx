import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../State/AuthSlics'
import { useNavigate } from 'react-router-dom'
import Cookie from 'cookie-universal'
const LogOut = () => {
  const cookie = Cookie()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async() => {
    dispatch(logOut()).then(() => {
      cookie.remove("e-commerce")
    }).then(()=>{
      navigate('/login')
    })
  }
  return (
    <button
      onClick={logoutHandler}
      className='logout-btn'
    >
      Logout
    </button>
  )
}

export default LogOut
