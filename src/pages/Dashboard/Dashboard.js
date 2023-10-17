import React, {  useState } from 'react'
import SideBar from '../../components/Dashboard/SideBar'
import TopBar from '../../components/Dashboard/TopBar'
import { Outlet } from 'react-router-dom'

import Alert from 'react-bootstrap/Alert';
const Dashboard = () => {
  const [alert,setAlert]= useState(true)
  setTimeout(() => {
    setAlert(false)
  }, 5000);
  return (
    <div className='dashboard posation-relative'>
    <Alert 
    style={{
      zIndex:"20",
      position:"absolute",
      bottom:"0",
      left:"10px",
      transition:"all 300ms",
      opacity:alert ?"1":"0"
    }} key={"info"} variant={"info"}>
          you redirect to the dashboard because you have access
        </Alert>
      <TopBar />
      <div style={{ height: "100vh" }} className='d-flex '>
        <SideBar />
        <div style={{ marginTop: "60px",overflow:"auto", width:"100%" }}>
          <Outlet />
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard
