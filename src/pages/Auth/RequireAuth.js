import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cookie from "cookie-universal";
import {  useDispatch } from 'react-redux';
import { getUser } from '../../State/UserSlice';
import Acsses from './403';
import OnlyLoading from '../../components/Website/OnlyLoading';
const RequireAuth = ({allowedRole}) => {
  const dispatch = useDispatch()
  const cookie = Cookie()
  const token = cookie.get("e-commerce")
  const [user, setUser] = useState(null)
  useEffect(() => {
    dispatch(getUser(token)).then((result) => {
      setUser(result.payload)
      
    })
  }, [])
  return token ? (
    user===null ? (
      <OnlyLoading/>
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (<Acsses />)
  ) : (<Navigate to={'/login'}/>)
}

export default RequireAuth
