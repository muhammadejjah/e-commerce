import axios from 'axios'
import React, { useEffect } from 'react'
import { BaseURL,GOOGLECALLBACK } from '../../Api/Api'
import { useLocation } from 'react-router-dom'
import Cookie from "cookie-universal";
import LogOut from '../../components/Website/LogOut';
const GoogleCallback = () => {
    const location =useLocation()
    const cookie = Cookie()
    const [user , setUser]=React.useState(null)
    async function googleCall (){
            
        try {
            const res = await axios.get(`${BaseURL}/${GOOGLECALLBACK}${location.search}`)
            .then((data)=>{
              cookie.set ("e-commerce",data.data.access_token)
              console.log(data.data.user)
              setUser(data.data.user)
            })
            
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        
        googleCall()
    },[])
    console.log(user)
  return (
    <div>
    <LogOut/>
      <h1>Welcome{user&&user.name} </h1>
    </div>
  )
}

export default GoogleCallback
