import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { openMenu } from '../../State/MenuSlice'
import { useDispatch } from 'react-redux'
import LogOut from '../../components/Website/LogOut'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { getUser } from '../../State/UserSlice'
import Cookie from "cookie-universal";
import Loading from '../Website/Loading'

const TopBar = () => {
  console.log("muhammad")
  const dispatch = useDispatch()
  const { isOpen } = useSelector(state => state.MenuSlice)
  const { loading } = useSelector(state => state.userSlice)
  const [user, setUser] = useState(null)
  const cookie = Cookie()
  const token = cookie.get("e-commerce")
  const openMenuHandler = () => {
    dispatch(openMenu())
  }

  useEffect(() => {
    dispatch(getUser(token)).then((result) => {
      setUser(result.payload.name)
    })
  }, [])
  return (
    <div className='top-bar shadow d-flex align-items-center justify-content-between  '>
      <div className='d-flex align-items-center gap-3'>
        <h3 className='m-0 fw-bold' >E-COMMERCE</h3>
        <FontAwesomeIcon onClick={openMenuHandler} cursor={"pointer"} size='xl' icon={!isOpen ? faBars : faXmark} />
      </div>
      <div className='d-flex align-items-center gap-3'>
        <div>
          <Loading loading={loading}>
          <DropdownButton
          className='text-center'
            as={ButtonGroup}
            align={{ lg: 'stert' }}
            title={user ? user[0].toUpperCase() : ""}
            id="text"
          >
            <Dropdown.Item  eventKey="1" className='text-center'>{user}</Dropdown.Item>
            <Dropdown.Item  eventKey="1"><LogOut /></Dropdown.Item>
          </DropdownButton>
          </Loading>
        </div>
      </div>
    </div>
  )
}

export default TopBar
