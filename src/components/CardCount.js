import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { basketList, basketRemove } from '../store/actions/basket'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Toast from './Toast';
import { toast } from 'react-toastify';
import PaidIcon from '@mui/icons-material/Paid';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


export default function CardCount({ b }) {

  const dispatch = useDispatch()
  const [count, setCount] = useState(1);
  const navigate = useNavigate()



  useEffect(() => {
    (async () => {
      await dispatch(basketList())
    })()

  }, [basketList])

  const handleDelete = useCallback(async (el) => {

    await dispatch(basketRemove(el))
    await dispatch(basketList())

  }, [])


  const handlePlus = useCallback((el) => {

    if (count >= el.quantity) {
      return null
    }
    else {
      setCount(count + 1)
    }
  }, [count])



  const handleMinus = useCallback((el) => {

    if (count === 1) {
      return null
    }
    else {
      setCount(count - 1)
    }
  }, [count])


  const handleBuy = useCallback((el) => {

    console.log(el)
    navigate('/payment')

  }, [])


  const singleItem = useCallback((item) => {
    if (b.product === null) {
      return
    }
    navigate(`/home/${item}`)
  }, [])


  return (
    <div>
      <Toast />
      <div className='table' key={b.product === null ? null : b.product.id}>
        <Table striped bordered hover>
          <tbody onClick={() => singleItem(b.product_id)} >
            {b.product === null ?
              <tr>
                <td><img width={50} height={50} src={null} /></td>
                <td>Not available for order</td>
                <td>Price not available </td>
                <td>
                  <button style={{ background: 'grey' }} disabled={true} onClick={(e) => {
                    e.stopPropagation()
                  }}>-</button>
                  <span>1</span>
                  <button style={{ background: 'grey' }} disabled={true} onClick={(e) => {
                    e.stopPropagation()
                  }}>+</button>
                </td>
                <td>
                  <button onClick={(e) => handleDelete(b.id, e.stopPropagation())}><RemoveShoppingCartIcon /></button>
                  <button style={{ background: 'grey' }} disabled ><PaidIcon /></button>
                </td>
              </tr>
              :
              <tr>
                <td><img width={50} height={50} src={b.product.image} /></td>
                <td>{b.product.short_desc}</td>
                <td>{count ? b.product.price * count + '$' : b.product.price + '$'}</td>
                <td>
                  {count === 1 ?
                    <button style={{ background: 'grey' }} disabled={true} onClick={(e) => {
                      e.stopPropagation()
                    }}>-</button>
                    :
                    <button onClick={(e) => {
                      e.stopPropagation()
                      handleMinus(b.quantity)
                    }}>-</button>
                  }
                  <span>{count}</span>
                  {count === b.quantity ?
                    <button style={{ background: 'grey' }} disabled={true} onClick={(e) => {
                      e.stopPropagation()
                    }}>+</button>
                    :
                    <button onClick={(e) => {
                      e.stopPropagation()
                      handlePlus(b)
                    }}>+</button>
                  }
                </td>
                <td>
                  <button onClick={(e) => handleDelete(b.id, e.stopPropagation())}><RemoveShoppingCartIcon /></button>
                  <button onClick={(e) => handleBuy(b, e.stopPropagation())}><PaidIcon /></button>
                </td>
              </tr>
            }
          </tbody>
        </Table>
      </div>
    </div>

  )
}
