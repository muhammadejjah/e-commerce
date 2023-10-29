import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { getAllUsers } from '../../State/UserSlice'
import { Link } from 'react-router-dom'
import Cookie from "cookie-universal";
import TableShow from '../../components/Dashboard/Table'
const Users = () => {
  const dispatch = useDispatch()
  const { users, user, loading } = useSelector(state => state.userSlice)
  const [usersa, setUsersa] = React.useState([])
  const [err, setErr] = React.useState("")
  const cookie = Cookie()
  const token = cookie.get("e-commerce")
  useEffect(() => {
    dispatch(getAllUsers(token)).then((result) => {
      if (result.payload !== 403) {
        setUsersa(usersa)
      } else {
        setErr("Error")
      }
    })
  }, [])




  // const deleteHandler = async (id) => {
  //   try {
  //     const res = await Axios.delete(`user/${id}`).then(() => {
  //       setD(!d)
  //     })

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // console.log(users)
  // const viewUsers = usersa.map((el, i) => {
  //   return (

  //     <tr key={i} onContextMenu={(e) => {
  //       e.preventDefault()
  //     }}>
  //       <td>{i + 1}</td>
  //       <td>{el.name}</td>
  //       <td>{el.email}</td>
  //       <td>{el.role == 2001 ? "user" : el.role == 1995 ? "admin" : el.role == 1996 ? "writer" : el.role == 1999 ? "products manger" : ""}</td>
  //       <td className='d-flex align-items-center justify-content-center gap-3'>
  //         {user.id === el.id ? "" : <FontAwesomeIcon cursor="pointer" color='red' size='xl' icon={faTrashCan} onClick={() => { deleteHandler(el.id) }} />}
  //         {user.id === el.id ? "(you)" : <Link to={`${el.id}`} ><FontAwesomeIcon size='xl' icon={faPenToSquare} /></Link>}
  //       </td>
  //     </tr>
  //   )
  // })
  const header = [
    {
      name: "Name",
      key: "name"
    },
    {
      name: "Email",
      key: "email"
    },
    {
      name: "Role",
      key: "role"
    },

  ]
  return (
    <Fragment>
      <div style={{ width: "100%" }} className=' overflow-hidden container mt-3'>
        <div className='d-flex align-items-center justify-content-between'>
          <h2 className='text-center'>All Users</h2>
          <Link to={"adduser"} className='form-button tdn my-2'>Add User</Link>
        </div>
        {err ? <h1>{err}</h1> :
          <TableShow
            header={header}
            data={users}
            currentUser={user}
            type={"users"}
            loading={loading}
          />
        }
      </div>
    </Fragment>
  )
}

export default Users


