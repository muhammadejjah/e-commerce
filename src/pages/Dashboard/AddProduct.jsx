import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import Loading from '../../components/Website/Loading'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getCategories } from '../../State/CategoriesSlice';
import { addproduct } from '../../State/ProductsSlice';
import Cookie from "cookie-universal";
const AddProduct = () => {
    const cookie = Cookie()
    const token = cookie.get("e-commerce")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, } = useSelector(state => state.CategoriesSlice)
    const [category, setCategory] = useState([])
    const [err, setErr] = useState(null)


    const [form, setForm] = useState({
        category: "Select Category",
        title: "",
        description: "",
        price: "",
        discount: "",
        About: ""
    })

    useEffect(() => {
        dispatch(getCategories(token)).unwrap().then(result => {
            setCategory(result)
        })
    }, [])


    const [images, setimages] = useState([])
    
    
    const hadelSubmite = (e) => {
        e.preventDefault();
        const data = new FormData()
        // data.append("category",form.category)
        // data.append("About", form.About)
        // data.append("title", form.title)
        // data.append("description", form.description)
        // data.append("price", form.price)
        // data.append("discount", form.discount)
        for(const key in form){
            data.append(key, form[key])
        }
        for (let index = 0; index < images.length; index++) {
            data.append("images[]", images[index])
            
        }
        dispatch(addproduct(data)).then((result) => {
            console.log(result)
            if (result.type === "/products/addProduct/fulfilled") {
                navigate("/dashboard/products")
            } else if (result.payload.response.status===422) {
                console.log(form)
                setErr("there are wrong field")
            }else{
                setErr("error from server")
            }
        })
    }
    const handleChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    
    const categoriesSelect = category.map((el, idx) => {
        return <option key={idx} value={el.id}>{el.title}</option>
    })
    return (
        <div className=' container '>
            <Form className='mt-3' onSubmit={(e) => { hadelSubmite(e) }}>
                <h2>Add New Product</h2>
                <Loading loading={loading}>
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Select
                            name='category'
                            value={form.category}
                            onChange={handleChange}
                            required >
                            <option disabled>Select Category</option>
                            {categoriesSelect}
                        </Form.Select>
                    </Form.Group>
                </Loading>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Control
                        type="text"
                        placeholder="title"
                        name='title'
                        value={form.title}
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Control
                        type="text"
                        placeholder="description"
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Control
                        type="text"
                        placeholder="price"
                        name='price'
                        value={form.price}
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="discount">
                    <Form.Control
                        type="text"
                        placeholder="discount"
                        name='discount' value={form.discount}
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="about">
                    <Form.Control
                        type="text"
                        placeholder="about"
                        name='About'
                        value={form.about}
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="images">
                    <Form.Control
                        type="file"
                        placeholder="about"
                        multiple
                        onChange={(e) => { setimages(e.target.files) }}
                    />
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

export default AddProduct
