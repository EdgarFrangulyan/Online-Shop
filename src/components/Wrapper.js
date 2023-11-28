import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/actions/products';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Toast from './Toast';
import Pagination from './Pagination';
import LikeCard from './LikeCard';
import Carousel from 'nuka-carousel'


export default function Wrapper() {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.productsData);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false)
    const { page } = useParams()
    const basket = useSelector((state) => state.basket.basket)



    useEffect(() => {
        (async () => {
            setLoading(true)
            await dispatch(getProducts(page))
            setLoading(false)
        })()

    }, [getProducts]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            (window.pageYOffset > 300)
                ? setShow(true)
                : setShow(false)
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleCategory = useCallback((pr) => {
console.log(pr)
    }, [])


    return (
        <>
            <Toast />

            <div className='main'>
               
                <div className='container'>
                    {!loading ?
                        <div className='cardStyle'>
                            {products.map((item) => (
                                <LikeCard item={item} key={item.id} />
                            ))}
                        </div>
                        :
                        <div className='spL'>
                            <Spinner className='spinnerLoad' animation="border" variant="dark" />
                        </div>

                    }
                    <div>
                        {show && (
                            <div className='top' onClick={goToTop}>
                                <ArrowUpwardIcon style={{ fontSize: 30, fill: 'white' }} />
                            </div>
                        )}
                    </div>
                    <Pagination />
                </div>
            </div>
        </>
    )
}




  /*
              <Carousel>
                    {products.map((pr) => (
                        <div onClick={() => handleCategory(pr)}>
 <img src ={pr.image} height={600} width={600}/>
                      </div>
                   ))}

                </Carousel>
                */