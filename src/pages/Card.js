import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { basketList } from '../store/actions/basket'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Toast from '../components/Toast';
import Spinner from 'react-bootstrap/Spinner';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardCount from '../components/CardCount';

export default function Card() {

  const dispatch = useDispatch()
  const basket = useSelector((state) => state.basket.basket)
  const token = localStorage.getItem("userToken")
  const userId = JSON.parse(localStorage.getItem("userData"))
  const [load, setLoad] = useState(true)





  useEffect(() => {
    (async () => {
      setLoad(true)
      await dispatch(basketList())
      setLoad(false)
    })()

  }, [basketList, basket])














  return (
    <div>

      <Header />
      <Toast />
        <div>
          {token && userId.id ?
            <div className='cardStyle'>
              
              {basket.length === 0 ? null :
                <h1>{basket.length}</h1>
              }

              {basket.length ?
                basket.map(b => (
                  <CardCount b={b} key={b.id} />
                ))
                :
                <div className='container'>
                  <section className='basketPanel'>
                    <h1 className='basketPanelTitle'>Cart <ShoppingCartIcon style={{ fontSize: 40 }} /> is empty</h1>
                    <p className='basketPanelDesc'> Look at the main page to select products or find what you need in the search. </p>
                    <Link to='/' className='basketPanelButton'>Home Page</Link>
                  </section>
                </div>
              }

            </div>

            :
            <div className='container'>
              <section className='basketPanel'>
                <h1 className='basketPanelTitle'>Cart <ShoppingCartIcon style={{ fontSize: 40 }} /> unavailable</h1>
                <p className='basketPanelDesc'> Please log in to see the items in your shopping cart. </p>
                <Link to='/account' className='basketPanelButton'>Login</Link>
              </section>
            </div>
          }
        </div>
      <Footer />


    </div>

  )
}
