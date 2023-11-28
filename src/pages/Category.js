import React, { useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation, useNavigate, useParams} from 'react-router-dom';
import { prodCategory } from '../store/actions/productCategory';
import Toast from '../components/Toast';
import AdminHeader from '../components/AdminHeader'
import ReactPaginate from 'react-paginate';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import qs from 'query-string'
import CategoryProducts from '../components/CategoryProducts';
import Spinner from 'react-bootstrap/Spinner';





export default function Category() {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.category.products);
  const [load, setLoad] = useState(true)
  const user = JSON.parse(localStorage.getItem("userData"))
  const { cat_id } = useParams();
  const navigate = useNavigate();
  const pages = useSelector((state) => state.category.page)
  const location = useLocation()
  const query = qs.parse(location.search)


  useEffect(() => {
    (async () => {
      setLoad(true)
   await dispatch(prodCategory({
    cat_id: cat_id,
    page: query.page
   }))
   setLoad(false)
    })()
  }, [cat_id, query.page]);


  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};


  const handlePage = useCallback(async(p) => {

const data = await dispatch(prodCategory({
  cat_id: cat_id,
  page: p
 }))
 if(data.payload){
  goToTop()
  navigate(`?page=${p}`)
 }

  }, [cat_id, pages])




  return (
    <div className='categoryMain'>
      {user && user.role === 2 ? <AdminHeader /> : <Header />}
      <Toast />
      {!load ?
      <div>
      {products.length ?
        <div className='cardStyle'>

          {products.map((product) => (
           <CategoryProducts product = {product} key={product.id}/>
          ))}
        </div>
        : <h2>Products in this category Empty</h2>}
         <div className='pages'>
            <div className='page'>
                {pages.map((p, index) =>
                    <div key={index}>
                        <ReactPaginate className='paginate'
                              activeClassName='activePage' 
                              activeLinkClassName='linkPage'
                             breakLabel="..."
                             nextLabel={<ArrowForwardIosIcon />}
                             onPageChange={(ev) => handlePage(ev.selected + 1)}
                             pageRangeDisplayed={5}
                             pageCount={p.pageCount}
                             forcePage={p.currentPage - 1}
                             previousLabel={<ArrowBackIosNewIcon />}
                             renderOnZeroPageCount={null}
                        />
                    </div>
                )}
            </div>
        </div>
        </div>
   : 
   <div className='spL'>
                            <Spinner className='spinnerLoad' animation="border" variant="dark" />
                        </div>
   }
      {user && user.role === 2 ? null : <Footer />}
    </div>
  )
}
