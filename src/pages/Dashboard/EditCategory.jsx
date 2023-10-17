import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Website/Loading';
import { editCategory, getCategory } from '../../State/CategoriesSlice';
import { useEffect } from 'react';
import Err404 from '../Auth/404';
import OnlyLoading from '../../components/Website/OnlyLoading';
import { useRef } from 'react';

const EditCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.CategoriesSlice)
    const [err, setErr] = useState(null)
    const [title, setTitle] = useState("")
    const [img, setImg] = useState("")
    const {id} = useParams()
    const focus = useRef(null)
    console.log(focus)
    useEffect(() => {
        focus.current.focus()
        dispatch(getCategory(id)).then(result => {
            // console.log(result)
            if (result.type === "categories/getCategory/fulfilled") {
                setTitle(result.payload.title)
            }else{
                setErr("error")
                
            }
            return title
        })
    },[])
    // useEffect(()=>{
    //     console.log(focus)
    // })
    const hadelSubmite = (e) => {
        e.preventDefault();
        const newCategory = new FormData()
        newCategory.append("title", title)
        newCategory.append("image", img)
        const data = {
            id:id,
            FormData:newCategory
        }
        dispatch(editCategory(data)).then((result) => {
            console.log(result.type)
            if (result.type === "categories/editCategory/fulfilled") {
                navigate("/dashboard/categories")
            } else {
                setErr("Error")
            }
        })
    }


    return (
        <div className=' container '>
            {!err?<Form className='mt-3' onSubmit={(e) => { hadelSubmite(e) }}>
            <h2>Edit Category</h2>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Control type="text" placeholder="Enter User title" value={title} onChange={(e) => { setTitle(e.target.value) }} ref={focus} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
                <Form.Control type="file" onChange={(e) => { setImg(e.target.files.item(0)) }} required />
            </Form.Group>
            <Loading loading={loading}>
                <Button className='mt-3' variant="primary" type="submit">
                    Submit
                </Button>{err && <span className='text-danger'>{err}</span>}
            </Loading>
        </Form>:<Err404/>}
        </div>
    )
}

export default EditCategory
