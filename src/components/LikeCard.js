import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { likeProduct, likeList } from '../store/actions/likeProducts';
import { basketList, basketCreate, } from '../store/actions/basket';
import { toast } from 'react-toastify';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { useNavigate } from 'react-router-dom';


export default function LikeCard({ item }) {

    const dispatch = useDispatch()
    const likes = useSelector((state) => state.likes.likes)
    const basket = useSelector((state) => state.basket.basket)
    const user = JSON.parse(localStorage.getItem("userData"))
    const navigate = useNavigate()



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


    const handleClick = useCallback(async (el) => {

        console.log(el)



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


    const singleItem = useCallback((item) => {
        navigate(`/home/${item.id}`)
    }, [])


    return (
        <div key={item.id} className='cardItem'>
            <div>
                <div onClick={() => singleItem(item)} className="card">
                    <figure className='figure'>
                        <img className="card-img-top" src={item.image} alt="Card image cap" />
                        <figcaption className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text desc">{item.short_desc}</p>
                            <p className="card-text">{item.price + '$'}</p>
                            {basket.find((id) => id.product_id === item.id && user) ?
                                <div onClick={(e) => e.stopPropagation()}>
                                    <button disabled={true}>
                                        <i style={{ fontSize: 35 }} class="bi bi-cart-check-fill"></i>
                                    </button>
                                </div>
                                :
                                <div onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => handleClick(item)}>
                                        <i style={{ fontSize: 35 }} class="bi bi-cart-plus-fill"></i>
                                    </button>
                                </div>
                            }
                        </figcaption>
                    </figure>
                </div>
                {likes.find((id) => id.product_id === item.id && user) ? (
                    <div className='btnChange'>
                        <button className='likeButton' disabled={true}>
                            <FavoriteSharpIcon style={{ fontSize: 35, color: 'red' }} />
                        </button>
                    </div>
                )
                    :
                    <div className='btnChange'>
                        <button onClick={() => handleLike(item)} className='likeButton'>
                            <FavoriteIcon style={{ fontSize: 35, color: 'black' }} />
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
