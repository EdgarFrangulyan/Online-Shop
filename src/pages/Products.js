import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { searchProducts } from '../store/actions/products'
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import qs from 'query-string'
import Toast from '../components/Toast'
import AdminHeader from '../components/AdminHeader'
import ReactPaginate from 'react-paginate'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Spinner from 'react-bootstrap/Spinner';
import SearchProducts from '../components/SearchProducts'



export default function Products() {


  const products = useSelector((state) => state.products.productSearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const location = useLocation()
  const query = qs.parse(location.search)
  const pages = useSelector((state) => state.products.searchPage) 
  const [load, setLoad] = useState(true)



  useEffect(() => {
  
    (async () => {
      setLoad(true)
      await dispatch(searchProducts({
        q: query.q,
        page: query.page
      }));
      setLoad(false)
    })()
  }, [searchProducts]);


  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",      
    });
  };



  

  const handlePage = useCallback(async (e) => {
    
  

const q = query.q
    const data = await dispatch(searchProducts({
      q: q,
      page: e
    }))
    if (data.payload) {
      navigate(`?q=${q}&page=${e}`)
      goToTop() 
    }
  }, [query])


  

  return (
    <div className='searchMain'>
      {userData && userData.role === 2 ? <AdminHeader /> : <Header />}
      {!load ?
        <div>
          <Toast />
          <div className='container'>
            {products.length ? (
              <div className='cardStyle'>

                {products.map((product) => (
                 <SearchProducts product = {product} key={product.id}/>
                ))}
              </div>
            )
              :
              <div>
                <h2 className='nfpd'>{`Nothing found for your search <<${query.q}>>`}</h2>

              </div>
            }
          </div>
        </div> :
        <div className='spL'>
          <Spinner className='spinnerLoad' animation="border" variant="dark" />
        </div>
      }
      <div className='pages'>
                  <div className='page'>
                    {pages.map((p, index) =>
                      <div key={index}>
                        <ReactPaginate className='paginate'
                          activeClassName='activePage'
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
 {userData && userData.role === 2 ? null : <Footer />}
    </div>
  )
}
