import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../State/UserSlice';
const AddUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[role,setRole]=useState("2001")
    const[name,steName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const [err,setErr]=useState(null)
    const selectHandler = (e)=>{
        setRole(e.target.value)
    }
    const user = {
        name,
        email,
        password,
        role
    }
    const addUserHandler = (e)=>{
       e.preventDefault()
    //    console.log(e.target)
       dispatch(addUser(user)).then((result)=>{
        if(result.type ==="user/addUser/fulfilled"){
            navigate("/dashboard/users")
        }else{
            setErr("this email is already taken")
        }
       })
    }
    return (
        <div className=' container '>
            <Form className='mt-3' onSubmit={(e)=>{addUserHandler(e)}}>
                <h2>Add New User</h2>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Control type="text" placeholder="Enter User Name" value={name} onChange={(e)=>{steName(e.target.value)}} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  required minLength={6}/>
                </Form.Group>
                <Form.Select value={role} onChange={(e) => { selectHandler(e) }} aria-label="Default select example">
                    <option value="1995">admin</option>
                    <option value="2001">user</option>
                    <option value="1996">writer</option>
                    <option value="1999">product manger</option>
                </Form.Select>
                <Button className='mt-3' variant="primary" type="submit">
                    Submit
                </Button>{err&&<span className='text-danger'>{err}</span>}
            </Form>
        </div>
    )
}

export default AddUser
