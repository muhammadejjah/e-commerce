import React from 'react'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../../State/CategoriesSlice';
import Loading from "../../components/Website/Loading"
const AddCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading}=useSelector(state=>state.CategoriesSlice)
    const [err,setErr]=useState(null)
    const [title,setTitle]=useState("")
    const [img,setImg]=useState("")
    
    const hadelSubmite = (e)=>{
        e.preventDefault();
        const newCategory= new FormData()
        newCategory.append("title",title)
        newCategory.append("image",img)
        console.log(newCategory)
        dispatch(addCategory(newCategory)).then((result)=>{
            if(result.type ==="categories/addCategory/fulfilled"){
                navigate("/dashboard/categories")
            }else{
                setErr("Error")
            }
           })
    }
    

    return (
        <div className=' container '>
            <Form className='mt-3' onSubmit={(e) => { hadelSubmite(e) }}>
                <h2>Add New User</h2>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Control type="text" placeholder="Enter User title" value={title} onChange={(e) => { setTitle(e.target.value) }} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Control type="file"   onChange={(e) => { setImg(e.target.files.item(0)) }} required />
                </Form.Group>
                <Loading loading={loading}>
                <Button className='mt-3' variant="primary" type="submit">
                    Submit
                </Button>{err && <span className='text-danger'>{err}</span>}
                </Loading>
            </Form>
        </div>
    )
}

export default AddCategory
