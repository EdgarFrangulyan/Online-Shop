import React, { useCallback, useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { delProduct } from '../store/actions/products';
import { prodCategory } from '../store/actions/productCategory';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { basketCreate, basketList } from '../store/actions/basket';
import { likeProduct, likeList } from '../store/actions/likeProducts';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import Modal from 'react-modal'
import { removeLike } from '../store/actions/likeProducts';
import { basketRemove } from '../store/actions/basket';
import { toast } from 'react-toastify';
import qs from 'query-string'


export default function CategoryProducts({ product }) {

  const user = JSON.parse(localStorage.getItem("userData"))
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const basket = useSelector((state) => state.basket.basket)
  const likes = useSelector((state) => state.likes.likes)
  const [open, setOpen] = useState(false)
  const [op, setOp] = useState(true)
  const { cat_id } = useParams();
  const location = useLocation()
  const query = qs.parse(location.search)




  const handleDelete = useCallback(async (pr) => {

     await dispatch(delProduct(pr))
      toast.success('Product Succesfully deleted')
    await dispatch(prodCategory({
      cat_id: cat_id,
      page: query.page
    }))
    
  }, [])

  const singleItem = useCallback((item) => {
   navigate(`/home/${item.id}`)
  }, [])


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

    else if (error) {
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

    else if (error) {
      return
    }


    const data = await dispatch(likeProduct({
      product_id: el.id,
      user_id: user.id
    }))
    if (data.payload) {
      toast.success(`${el.title} added in your wishlist`)
    }
    await dispatch(likeList())
  }, [user])





  return (
    <div key={product.id} className='cardItem'>
      <div onClick={() => singleItem(product)} className="card ">
        <figure>
          <img className="card-img-top" src={product.image} alt="Card image cap" />
          <figcaption className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text desc">{product.short_desc}</p>
            <p className="card-text">{product.price + '$'}</p>
            {user && user.role === 2 ?
            <div onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setOpen(!open)}>
                <RemoveShoppingCartIcon style={{ fontSize: 30 }} />
              </button>
              {open ? 
               <Modal className='modalDelete' isOpen={op}>
               <div className='modDiv'>
               <span>Delete this product?</span>
               <button onClick={() => handleDelete(product.id)}>Yes</button>
               <button className='noBtn' onClick={() => setOpen(!open)}>No</button>
               </div>
                   </Modal>
            :
            null
            }
             </div>
              :
              <div>
                {basket.find((id) => id.product_id === product.id && user) ?
                  <div onClick={(e) => e.stopPropagation()}>
                    <button disabled={true}>
                      <i style={{ fontSize: 35 }} class="bi bi-cart-check-fill"></i>
                    </button>
                  </div>
                  :
                  <div onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => handleClick(product)}>
                      <i style={{ fontSize: 35 }} class="bi bi-cart-plus-fill"></i>
                    </button>
                  </div>
                }
              </div>
            }
          </figcaption>
        </figure>
      </div>
      {user && user.role === 2 ? null :
        <div>

          {likes.find((id) => id.product_id === product.id && user) ? (
            <div className='btnChange'>
              <button className='likeButton' disabled={true}>
                <FavoriteSharpIcon style={{ fontSize: 35, color: 'red' }} />
              </button>
            </div>
          )
            :
            <div className='btnChange'>
              <button onClick={() => handleLike(product)} className='likeButton'>
                <FavoriteIcon style={{ fontSize: 35, color: 'black' }} />
              </button>
            </div>
          }
        </div>
      }
    </div>
  )
}
