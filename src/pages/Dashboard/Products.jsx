import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from "../../components/Website/Loading"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Cookie from "cookie-universal";
import TableShow from '../../components/Dashboard/Table'
import { getProducts } from '../../State/ProductsSlice'

const Products = () => {

  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(state => state.ProductsSlice)
  const [err, setErr] = React.useState(null)
  const cookie = Cookie()
  const token = cookie.get("e-commerce")
  console.log(products)
  useEffect(() => {
    dispatch(getProducts(token))
  }, [])
  const header = [
    {
      name: "title",
      key: "title"
    },
    {
      name: "description",
      key: "description"
    },
    {
      name: "price",
      key: "price"
    },
    {
      name: "rating",
      key: "rating"
    },
  ]
  return (
    <Fragment>
      <div style={{ width: "100%" }} className=' overflow-hidden container mt-3'>
        <div className='d-flex align-items-center justify-content-between'>
          <h2 className='text-center'>Products</h2>
          <Link to={"addproduct"} className='form-button tdn my-2'>Add product</Link>
        </div>
        {err ? <h1>{err}</h1> :
          <TableShow
            header={header}
            data={products}
            type={"products"} 
            loading={loading}
          />
        }
      </div>
    </Fragment>
  )
}

export default Products
