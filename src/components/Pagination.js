import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate'
import { getProducts } from '../store/actions/products'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';


export default function Pagination() {

    const pages = useSelector((state) => state.products.pages)
    const navigate = useNavigate()
    const dispatch = useDispatch()



    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    const handlePage = useCallback(async (p) => {
         const current = pages[0].currentPage
                if (current === p) {
                    return null
                }
        const data = await dispatch(getProducts(p))
        if (data.payload) {
            navigate(`/products/${p}`)
            goToTop()
        }
    }, [pages, getProducts])


    return (
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
                            pageRangeDisplayed={2}
                            pageCount={p.pageCount}
                            forcePage={p.currentPage - 1}
                            previousLabel={<ArrowBackIosNewIcon />}
                            renderOnZeroPageCount={null}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
