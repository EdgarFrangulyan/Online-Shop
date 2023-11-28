import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { prodCategory } from '../store/actions/productCategory'
import Carousel from 'nuka-carousel'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function SimilarProducts({pr}) {

  const navigate = useNavigate()
const dispatch = useDispatch()
const catProd = useSelector((state) => state.category.products);


   useEffect(() => {
(async() => {
await dispatch(prodCategory({
  cat_id: pr.cat_id
}))
})()
   }, [])



    const singleItem = useCallback(async(id) => {
        navigate(`/home/${id}`)
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }, [])


  return (   
    <Carousel
        slidesToShow={4}
        renderBottomCenterControls={false}
       defaultControlsConfig={{
          nextButtonText: <ArrowForwardIosIcon />,
          prevButtonText: <ArrowBackIosNewIcon />,
        }
        }
      >
{catProd.map((pr) => 
<div key={pr.id} className='cardStyleBottom'>
    <div onClick={() => singleItem(pr.id)} className='cardItemBottom'>
      <img className="card-img-top" src={pr.image} alt="Card image cap" />
      <div className="card-body">
        <p className="card-text">{pr.price + '$'}</p>
        <p className="card-text desc">{pr.description}</p>
      </div>
    </div>
  </div>
  )}
   </Carousel>
  )
}
