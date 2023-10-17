import React from 'react'
import { Fragment } from 'react'
import Loading from "../../components/Website/Loading"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import TableShow from '../../components/Dashboard/Table'
import { getCategories } from '../../State/CategoriesSlice'
import { Link } from 'react-router-dom'
import { token } from '../../Api/Token'
const Categories = () => {
  const dispatch = useDispatch()
  const { categories, loading, error } = useSelector(state => state.CategoriesSlice)
  const [err, setErr] = React.useState(null)
  useEffect(() => {
    dispatch(getCategories(token))
  }, [])
  const header = [
    {
      name: "title",
      key: "title"
    },
    {
      name: "image",
      key: "image"
    },
  ]

  return (
    <Fragment>
      <div style={{ width: "100%" }} className=' overflow-hidden container mt-3'>
        <div className='d-flex align-items-center justify-content-between'>
          <h2 className='text-center'>Categories</h2>
          <Link to={"addcategory"} className='form-button tdn my-2'>Add Category</Link>
        </div>
        {err ? <h1>{err}</h1> :
          <TableShow
            header={header}
            data={categories}
            type={"categories"}
            loading={loading}
          />
        }
      </div>
    </Fragment>
  )
}

export default Categories
