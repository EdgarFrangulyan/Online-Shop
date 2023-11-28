import { useDispatch, useSelector } from 'react-redux'
import { likeList} from '../store/actions/likeProducts'
import Header from '../components/Header'
import Footer from '../components/Footer'
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast';
import Likes from '../components/Likes';

export default function LikeProducts() {


  const [load, setLoad] = useState(true)
  const likes = useSelector((state) => state.likes.likes)
  const dispatch = useDispatch()
  const token = localStorage.getItem("userToken")
  



  useEffect(() => {
    (async () => {
      setLoad(true)
      await dispatch(likeList())
      setLoad(false)
    })()

  }, [likeList])




  return (

    <>
      <Toast />
      <Header />

      {token ?
        <>
          {!load ?
            <div>
              {likes.length ?
              
                <div className='cardStyle'>
                  {likes.map((item) => (
                    
                 <Likes key={item.id} item = {item}/>
                    
                  ))
                  }
                </div>
                :
                <div className='container'>
                  <section className='emptyWishPanel'>
                    <h1 className='emptyWishPanelTitle'>Your wish❤list is Empty.</h1>
                    <p className='emptyWishPanelDesc'>
                      Look at the main page to select products or find what you need in the search. </p>
                    <Link to='/' className='emptyWishPanelButton'>Home Page</Link>
                  </section>
                </div>
              }
            </div>

            :
            <div className='spL'>
              <Spinner className='spinnerLoad' animation="border" variant="dark" />

            </div>
          }
        </>
        :
        <div className='container'>
          <section className='wishPanel'>
            <h1 className='wishPanelTitle'>Wish❤️list unavailable.</h1>
            <p className='wishPanelDesc'> Please log in to see the items on your wish list. </p>
            <Link to='/account' className='wishPanelButton'>Login</Link>
          </section>
        </div>
      }
      <Footer />

    </>

  )
}






/*
<div className='cardStyle'>
                  {likes.map((item) => (
                    
                    <div key={item.product.id} className='cardItem'>
                      <div onClick={() => singleItem(item.product)} className="likeCard ">
                        <img className="card-img-top" src={item.product.image} alt="Card image cap" />
                        <div className="card-body">
                          <h5 className="card-title">{item.product.title}</h5>
                          <p className="card-text desc">{item.product.short_desc}</p>
                          <p className="card-text">{item.product.price + '$'}</p>
                          <div onClick={(e) => e.stopPropagation()}>
                          {basket.find((id) => id === item.product_id) ? 
                           <button disabled={true}>
                           <i style={{ fontSize: 35 }} class="bi bi-cart-check-fill"></i>
                       </button>
                        :  
                               <button onClick={() => handleClick(item)}>
                                        <i style={{ fontSize: 35 }} class="bi bi-cart-plus-fill"></i>
                                    </button>
                        }
                        </div>
                          
                          <button className='btnPr' onClick={(e) => handleDelete(item.id, e.stopPropagation())}>
                            <RemoveShoppingCartIcon style={{ fontSize: 35 }} />
                          </button>
                        </div>
                      </div>
                    </div>
*/