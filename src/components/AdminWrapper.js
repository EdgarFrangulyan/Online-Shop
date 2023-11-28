import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getProducts } from '../store/actions/products'
import Spinner from 'react-bootstrap/Spinner';
import Toast from './Toast';
import Pagination from './Pagination';
import qs from 'query-string'



export default function AdminWrapper() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector((state) => state.products.productsData);
  const [load, setLoad] = useState(true)
  const { page } = useParams()



  useEffect(() => {

    (async () => {
      setLoad(true)
      await dispatch(getProducts(page))
      setLoad(false)
    })()

  }, [getProducts])






  const singleItem = useCallback((el) => {

    navigate(`/home/${el}`)

  }, [])





  return (
    <div className='main'>
      <Toast />
      {!load ? (
        <div className='cardStyle'>

          {products.map((item) => (
            <div key={item.id} className='cardItem'>
              <div onClick={() => singleItem(item.id)} className="card">
                <div>
                  <figure className='figure'>
                    <img className="card-img-top" src={item.image} alt="Card image cap" />
                    <figcaption className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text desc">{item.short_desc}</p>
                      <p className="card-text">{item.price + '$'}</p>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
        :
        <div className='spL'>
          <Spinner className='spinnerLoad' animation="border" variant="dark" />
        </div>
      }
      <div className='pageAdmin'>
        <Pagination />
      </div>
    </div>

  )
}
