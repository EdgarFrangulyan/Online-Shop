import React, { useEffect } from 'react';
import { singleProduct } from '../store/actions/products';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { ratingList } from '../store/actions/rating';
import Carousel from 'nuka-carousel';
import Toast from '../components/Toast';
import { prodCategory } from '../store/actions/productCategory';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AdminHeader from '../components/AdminHeader'
import SimilarProducts from '../components/SimilarProducts';
import Single from '../components/Single';


export default function SingleProduct() {
  const { productId } = useParams();
  const product = useSelector((state) => state.products.singleProduct);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userData"))
  const token = localStorage.getItem("userToken")
  //const catProd = useSelector((state) => state.category.products);
  



  useEffect(() => {
    (async () => {
     await dispatch(singleProduct(productId))
    })()
  }, [productId])



  return (
    <>
      {user && user.role === 2 ? <AdminHeader /> : <Header />}
      <Toast />
      {product.length ?
        <div>
          {product.map((item) => (
<Single key={item.id} item = {item}/>
          ))}
        </div>
        :
        null}
      <div className='simPr'>
        <h2>Similar products</h2>
      </div>
        {product.map((pr) => (
          <SimilarProducts key={pr.id} pr = {pr}/>
        ))}
      {user && user.role !== 2 ? <Footer /> : null}
    </>
  )
}
