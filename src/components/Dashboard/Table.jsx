import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../../State/UserSlice'
import { deleteCategory } from '../../State/CategoriesSlice'
import { openImg } from '../../State/ModalSlice'
import Modal from '../Website/Modal'
import { Fragment } from 'react'
import 'lightbox.js-react/dist/index.css'
import {Image} from "lightbox.js-react"
import { deleteProduct } from '../../State/ProductsSlice'

const TableShow = ({ header, data, currentUser, type, loading }) => {
    const cu = currentUser || false;
    const dispatch = useDispatch()  
    const [clicked, setClicked] = useState(null) 
    const deleteHandler = async (id) => {
        setClicked(id)
        if (type === "users") {
            dispatch(deleteUser(id))
        } else if (type === "categories") {
            dispatch(deleteCategory(id))
        } else if(type ==="products") {
            dispatch(deleteProduct(id))
        }
    }

    const viewHeaders = header.map((item, i) => {
        return (
            <th key={i}>{item.name}</th>
        )
    })
    const viewBody = data.map((item, i) => {
        return <tr key={i}>
            <td>{i + 1}</td>
            {header.map((item2, idx) =>
                <td key={idx}>
                    {item[item2.key] === "1995" ? "admin" :
                        item[item2.key] === "1996" ? "writer" :
                            item[item2.key] === "2001" ? "user" :
                                item[item2.key] === "1999" ? "product manger" :
                                    item2.key === "image" ?
                                        
                                    <Image image={{src:item[item2.key] , title: "Cyberpunk",}} /> :
                                        item[item2.key]
                    }
                </td>
            )}
            <td className='d-flex align-items-center justify-content-center gap-3'>
                {item.id === cu.id ? "" :
                    loading && item.id === clicked ? "Loading.." : <FontAwesomeIcon
                        cursor="pointer"
                        color='red'
                        size='xl'
                        icon={faTrashCan}
                        onClick={() => { deleteHandler(item.id) }}
                    />
                }
                {cu && item.id === cu.id ? "(you)" : <Link to={`${item.id}`} ><FontAwesomeIcon size='xl' icon={faPenToSquare} /></Link>}
            </td>
        </tr>
    })
    return (
        <Fragment>
        <Table striped bordered hover style={{ width: "100%" }}>
            <thead>
                <tr>
                    <td>ID</td>
                    {viewHeaders}
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                { data.length < 1 ?<tr  className='text-center '><td className=' text-danger' colSpan={12} >no data</td></tr>:viewBody}
            </tbody>
        </Table>
        
        </Fragment>
    )
}

export default TableShow
