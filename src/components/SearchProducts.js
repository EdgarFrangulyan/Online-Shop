import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { basketCreate, basketList } from '../store/actions/basket';
import { likeProduct, likeList } from '../store/actions/likeProducts';
import { toast } from 'react-toastify';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';


export default function SearchProducts({ product }) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("userData"))
  const basket = useSelector((state) => state.basket.basket)
  const likes = useSelector((state) => state.likes.likes)



  const handleClick = useCallback(async (el) => {


    let error = false
    const prodId = basket.map((id) => (id.product_id))


    if (prodId.find((id) => id === el.id)) {
      error = true
      toast.error('Item already in cart!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    if (!user) {
      toast.error('Please login to be add card!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return
    }

    else if (error && user) {
      return
    }


    const data = await dispatch(basketCreate({
      user_id: user.id,
      product_id: el.id,
      quantity: el.quantity,
      price: el.price
    }))

    if (data.payload) {
      toast.success(`${el.title} added in your basket`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }




    await dispatch(basketList())
  }, [user])



  const handleLike = useCallback(async (el) => {

    let error = false
    const likeId = likes.map((id) => (id.product_id))

    if (likeId.find((id) => id === el.id)) {
      error = true
      toast.error('Item already in your wishlist!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }


    if (!user) {
      toast.error('Please login to be add item in your wishlist!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return
    }

    else if (error && user) {
      return
    }


    const data = await dispatch(likeProduct({

      product_id: el.id,
      user_id: user.id
    }))
    if (data.payload) {
      toast(`${el.title} added in your wishlist`)
    }

    await dispatch(likeList())

  }, [user])


  const singleItem = useCallback((item) => {
    navigate(`/home/${item.id}`);
  }, [])

  return (
    <div className='cardItem' key={product.id}>
      <div onClick={() => singleItem(product)} className="card">
        <figure className='figure'>
          <img className="card-img-top" src={product.image} alt="Card image cap" />
          <figcaption className="card-body">
            <h5 className="card-title">Brand: {product.title}</h5>
            <p className="card-text desc">Description: {product.short_desc}</p>
            <p className="card-text">Price: {product.price + '$'}</p>
            {user && user.role === 2 ? null :
              <div onClick={(e) => e.stopPropagation()}>
                {basket.find((id) => id.product_id === product.id) ?
                  <button disabled={true}>
                    <i style={{ fontSize: 35 }} class="bi bi-cart-check-fill"></i>
                  </button>
                  :
                  <button onClick={() => handleClick(product)}>
                    <i style={{ fontSize: 35 }} class="bi bi-cart-plus-fill"></i>
                  </button>
                }
              </div>
            }
          </figcaption>
        </figure>
      </div>
      {user && user.role === 2 ? null :
        <div className='btnChange'>
          {likes.find((id) => id.product_id === product.id) ?
            <button className='likeButton' disabled={true}>
              <FavoriteSharpIcon style={{ fontSize: 35, color: 'red' }} />
            </button>
            :
            <button onClick={() => handleLike(product)} className='likeButton'>
              <FavoriteIcon style={{ fontSize: 35, color: 'black' }} />
            </button>
          }
        </div>
      }
    </div>

  )
}




