import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-modal'
import { updateProduct } from '../store/actions/products';
import {  useParams } from 'react-router-dom';
import { prodCategory } from '../store/actions/productCategory'
import { singleProduct } from '../store/actions/products';
import { toast } from 'react-toastify';
import {basketList} from '../store/actions/basket'



export default function Update({ item }) {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [short, setShort] = useState('')
    const [qnt, setQnt] = useState('')
    const [mod, setMod] = useState(true)
    const { productId } = useParams();

 
    const handleSubmit = useCallback(async(ev) => {
      ev.preventDefault()  

   const data =  await dispatch(updateProduct({
        id: item.id,
        title: title, 
        description: desc,
        price: price,
        quantity: qnt,
        short_desc: short
    }))
    if(data.payload){
        await dispatch(singleProduct(productId))
        await dispatch(prodCategory({
            cat_id: item.cat_id
        }))
        toast.success('Product succesfully updated')
    }
         setShow(!show)
           setTitle('')
           setDesc('')
           setPrice('')
           setQnt('')
           setShort('')
    }, [title, desc, price, qnt, short])



    return (
        <div className='modall'>
        <div className='btnAdd' onClick={(e) => e.stopPropagation()}>
            <button className='addToCard' onClick={() =>  setShow(!show)}>
                Edit Product <EditIcon  style={{ fontSize: 30 }} />
            </button>
            </div>
            {show ?
                <Modal className='modalUpdate' ariaHideApp={false} isOpen={mod}>
                    <div className='modDiv'>
                    <form onSubmit={(ev) => handleSubmit(ev)}>
                        <span onClick={() => setShow(!show)}>X</span>
                        <input value={title} onChange={(ev) => setTitle(ev.target.value)} type='text' placeholder='Title' />
                        <input value={desc} onChange={(ev) => setDesc(ev.target.value)} type='text' placeholder='Description' />
                        <input value={short} onChange={(ev) => setShort(ev.target.value)} type='text' placeholder='Short Description' />
                        <input value={qnt} onChange={(ev) => setQnt(ev.target.value)} type='number' placeholder='Quantity' />
                        <input value={price} onChange={(ev) => setPrice(ev.target.value)} type='number' placeholder='Price' />
                        <button type='submit'>Add</button>
                    </form>
                    </div>
                </Modal>
                :
                null
            }
        </div>
    )
}
