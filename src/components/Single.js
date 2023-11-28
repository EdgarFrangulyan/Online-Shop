import React, { useCallback, useEffect } from 'react'
import Carousel from 'nuka-carousel'
import Update from './Update'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Zoom from 'react-img-hover-zoom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { basketList, basketCreate } from '../store/actions/basket';
import { likeProduct, likeList } from '../store/actions/likeProducts';
import { createRating } from '../store/actions/rating';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import { ratingList } from '../store/actions/rating';
import { useParams } from 'react-router-dom';



export default function Single({ item }) {

    const user = JSON.parse(localStorage.getItem("userData"))
    const dispatch = useDispatch()
    const basket = useSelector((state) => state.basket.basket)
    const likes = useSelector((state) => state.likes.likes)
    const token = localStorage.getItem("userToken")
    const singleRate = useSelector((state) => state.rating.singleRating)
    const rate = useSelector((state) => state.rating.rate)
    const { productId } = useParams();


    useEffect(() => {
        (async () => {
            if (token) {
                await dispatch(ratingList(productId))
            }
        })()
    }, [])


    const handleStar = useCallback(async (st) => {

        if (!user) {
            toast.error('Please login to be create rating')
        }

        if (user.role === 2) {
            toast.error('Admin cannot create rating')
            return
        }
        await dispatch(createRating({
            product_id: st.item.id,
            user_id: user.id,
            rate: st.rating
        }))
        await dispatch(ratingList(productId))
    }, [rate])



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
            return;
        }

        else if (error && user) {
            return;
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








    return (
        <div key={item.id} className='singleCardStyle'>
            <div className="singleCard">
                <div className='carousel'>
                    <Carousel wrapAround animation='fade'
                        defaultControlsConfig={{
                            nextButtonText: <ArrowForwardIosIcon />,
                            prevButtonText: <ArrowBackIosNewIcon />,
                        }
                        }
                    >
                        {item.images.map((i, index) => (
                            <figure key={index}>
                                <Zoom
                                    zoomScale={2}
                                    width={450}
                                    img={i}
                                    height={450}
                                    style={{ transform: 'scale(1)' }}
                                    className='zoom'
                                />
                            </figure>
                        ))}
                    </Carousel>
                </div>

                <div className="productBody">
                    <h5 className="productTitle">{item.title}</h5>
                    <p className="productPrice">Price {item.price + '$'}</p>
                    <p className="productText desc">Description {item.description}</p>
                    {user && user.role !== 2 ?
                        <button onClick={(e) => e.stopPropagation()} className='stars'>
                            <StarRatings
                                rating={+singleRate}
                                starRatedColor="rgb(244, 231, 47)"
                                starHoverColor='yellow'
                                starDimension='30px'
                                starSpacing='9px'
                                starEmptyColor='grey'
                                changeRating={(ev) => handleStar({ rating: ev, item: item })}
                                numberOfStars={5}
                                name='rating'
                            />
                        </button>
                        :
                        <button className='stars'>
                            <StarRatings
                                rating={+singleRate}
                                starRatedColor="rgb(244, 231, 47)"
                                starHoverColor='yellow'
                                starDimension='30px'
                                starSpacing='9px'
                                starEmptyColor='grey'
                                numberOfStars={5}
                                name='rating'
                            />
                        </button>
                    }
                </div>
                {user && user.role === 2 ?
                    <Update item={item} key={item.id} />
                    :
                    <div className='btnAdd'>
                        {basket.find((id) => id.product_id === item.id) ?
                            <button className='addToCard' onClick={(e) => e.stopPropagation()} disabled={true}>
                                <i style={{ fontSize: 30 }} class="bi bi-cart-check-fill">Added</i>
                            </button>
                            :
                            <button onClick={(e) => handleClick(item, e.stopPropagation())} className='addToCard'>
                                <i style={{ fontSize: 25 }} class="bi bi-cart-plus-fill">Add to Card</i>
                            </button>

                        }
                        <div onClick={(e) => e.stopPropagation()}>
                            {likes.find((id) => id.product_id === item.id) ?
                                <button style={{ fontSize: 25 }} disabled={true} className='addToWishList'>
                                    <FavoriteSharpIcon style={{ color: 'red', fontSize: 25 }} />Added
                                </button>
                                :
                                <button onClick={() => handleLike(item)} className='addToWishList'>
                                    <FavoriteIcon style={{ color: 'red', fontSize: 25 }} /> Add To Wishlist
                                </button>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
