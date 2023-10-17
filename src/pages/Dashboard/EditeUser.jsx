import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../Api/axisos';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../../State/UserSlice';
import Loading from '../../components/Website/Loading';
import Cookie from "cookie-universal";
import axios from "axios"
import { BaseURL } from '../../Api/Api';
import Err404 from '../Auth/404';
import OnlyLoading from '../../components/Website/OnlyLoading';
const EditeUser = () => {
    const cookie = Cookie()
    const token = cookie.get("e-commerce")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector(state => state.userSlice)
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [err, setErr] = useState(null)
    // const id = +window.location.pathname.replace("/dashboard/users/", "")
    const {id} = useParams()
    // console.log(params)
    // console.log(Axios)
    const fetchData = async () => {
        try {
            const res = await axios.get(`${BaseURL}/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setName(res.data.name)
            setEmail(res.data.email)
            setRole(res.data.role)
            console.log(res)
        } catch (error) {
            setErr(error.response.status)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const newUser = {
        id: id,
        name: name,
        email: email,
        role: role,
    }
    // console.log(newUser)
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editUser(newUser)).then((result) => {
            console.log(result)
            navigate("/dashboard/users")
        })

    }
    const selectHandler = (e) => {
        setRole(e.target.value)

    }
    console.log(role)
    return (
        <div className='container'>
            {!err ? <Form onSubmit={handleSubmit}>
                <h1>Edit User</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Password" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </Form.Group>
                <Form.Select value={role} onChange={(e) => { selectHandler(e) }} aria-label="Default select example">
                    <option value="1995">admin</option>
                    <option value="2001">user</option>
                    <option value="1996">writer</option>
                    <option value="1999">product manger</option>
                </Form.Select>
                <Loading loading={loading}>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Loading>
            </Form> : <Err404 />}
        </div>
    )
}

export default EditeUser
