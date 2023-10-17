import { faPenNib, faPlus, faUsers, faTruck, faFile, faFileArrowUp, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { smallScreens } from "../../State/WindowSlice"
import { useDispatch } from 'react-redux'
import { openMenu } from '../../State/MenuSlice'
import { getUser } from '../../State/UserSlice'
import Cookie from "cookie-universal";
import Links from './Links'
const SideBar = () => {
  const { isOpen } = useSelector(state => state.MenuSlice)
  const { windowSize } = useSelector(state => state.WindowSlice)
  const cookie = Cookie()
  const token = cookie.get("e-commerce")
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  // console.log(user)
  const openHandler = () => {
    dispatch(openMenu())
  }
  useEffect(() => {
    dispatch(getUser(token)).unwrap().then(result => {
      // console.log(result)
      setUser(result)
    })
    if (windowSize < 768) {
      openHandler()
    }
  }, [])
  window.onresize = () => {
    dispatch(smallScreens(window.innerWidth))
  }

  return (
    <Fragment>
      <div style={{
        position: "fixed",
        backgroundColor: "#0d0e0fa0",
        width: "100%",
        height: "100vh",
        display: windowSize < 768 && isOpen ? "block" : "none"
      }}
        onClick={openHandler}>
      </div>
      <div className='side-bar shadow d-flex flex-column align-items-center '
        style={{
          width: isOpen ? "250px" : "fit-content",
          left: windowSize < 768 ? isOpen ? "0" : "-100%" : 0,
          position: windowSize < 768 ? "fixed" : "sticky",
          top: "60px"
        }}>
        <Links
          role={["1995"]}
          name="Users"
          path="users"
          userRole={user ? user.role : ""}
          isOpen={isOpen}
          icon={faUsers}
          onClick={()=>{
            if(isOpen){
              console.log("okfo")
              dispatch(openMenu())
            }
          }}
          
           />
        <Links
          role={["1995"]}
          name="Add User"
          path="users/adduser"
          userRole={user ? user.role : ""}
          isOpen={isOpen} icon={faPlus}
           />
        <Links
          role={["1996", "1995"]}
          name="Writer"
          path="writer"
          userRole={user ? user.role : ""}
          isOpen={isOpen}
          icon={faPenNib}
          />
        <Links
          role={["1999", "1995"]}
          name="Categories"
          path="categories"
          userRole={user ? user.role : ""}
          isOpen={isOpen}
          icon={faFile}
          />
        <Links
          role={["1999", "1995"]}
          name="Add Category"
          path="categories/addcategory"
          userRole={user ? user.role : ""}
          isOpen={isOpen}
          icon={faFileArrowUp}
          />
        <Links
          role={["1999", "1995"]}
          name="Products"
          path="products"
          userRole={user ? user.role : ""}
          isOpen={isOpen}
          icon={faTruck}
          />
          <Links
          role={["1999", "1995"]}
          name="Add Product"
          path="products/addproduct"
          userRole={user ? user.role : ""}
          isOpen={isOpen}
          icon={faCirclePlus}
          />
      </div>
      
    </Fragment>
  )
}

export default SideBar
