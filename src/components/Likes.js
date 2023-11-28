import React, { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { basketList, basketCreate } from '../store/actions/basket';
import { removeLike, likeList } from '../store/actions/likeProducts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../store/actions/products';

export default function Likes({ item }) {


    const user = JSON.parse(localStorage.getItem("userData"))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const basket = useSelector((state) => state.basket.basket)



    const handleDelete = useCallback(async (el) => {
        await dispatch(removeLike(el))
        await dispatch(likeList())
    }, [])

    const singleItem = useCallback((item) => {
        navigate(`/home/${item.id}`)
    }, [])

    const handleClick = useCallback(async (el) => {


        let error = false
        const prodId = basket.map((id) => (id.product_id))



        if (prodId.find((id) => id === el.product_id)) {
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
            product_id: el.product.id,
            quantity: el.product.quantity,
            price: el.product.price
        }))

        if (data.payload) {
            toast.success(`${el.product.title} added in your basket`, {
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


    return (

        <div key={item.product === null ? null : item.product.id} className='cardItem'>
            <div onClick={() => singleItem(item.product)} className="likeCard ">
                {item.product === null ?
                    <figure className='figure'>
                    <img className='card-img-top' src = ''/>
                    <figcaption className='card-body'>
                    <h5 className="card-title">Product is not available</h5>
                    <div className='btnLike'>
                            <button className='btnPr' onClick={(e) => handleDelete(item.id, e.stopPropagation())}>
                                    <RemoveShoppingCartIcon style={{ fontSize: 35 }} />
                                </button>
                                </div>
                    </figcaption>
                    </figure>
                    :
                    <figure className='figure'>
                        <img className="card-img-top" src={item.product.image} alt="Card image cap" />
                        <figcaption className="card-body">
                            <h5 className="card-title">{item.product.title}</h5>
                            <p className="card-text desc">{item.product.short_desc}</p>
                            <p className="card-text">{item.product.price + '$'}</p>
                            <div className='btnLike' onClick={(e) => e.stopPropagation()}>
                                {basket.find((id) => id.product_id === item.product.id) ?
                                    <button className='btnPr' disabled={true}>
                                        <i style={{ fontSize: 35 }} class="bi bi-cart-check-fill"></i>
                                    </button>
                                    :
                                    <button className='btnPr' onClick={() => handleClick(item)}>
                                        <i style={{ fontSize: 35, color: 'black' }} class="bi bi-cart-plus-fill"></i>
                                    </button>
                                }
                                <button className='btnPr' onClick={(e) => handleDelete(item.id, e.stopPropagation())}>
                                    <RemoveShoppingCartIcon style={{ fontSize: 35 }} />
                                </button>
                            </div>

                        </figcaption>
                    </figure>
                }
            </div>
        </div>

    )
}
