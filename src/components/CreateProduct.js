import React, { useCallback, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { addProduct } from '../store/actions/products'
import { toast } from 'react-toastify'


export default function CreateProduct({item}) {


const dispatch = useDispatch()
const [open ,setOpen] = useState(true)
const [title, setTitle] = useState('')
const [price, setPrice] = useState('')
const [qnt, setQnt] = useState('')
const [desc, setDesc] = useState('')
const [short, setShort] = useState('')
const [img, setImg] = useState([])
const [imgs, setImgs] = useState([])




const handleCreate = useCallback(async(id) => {

const data = await dispatch(addProduct({
    title: title,
    description: desc,
    short_desc: short,
    quantity: qnt,
    price: price,
    image: img,
    cat_id: id
}))
if(data.payload){
  toast(`${title} succesfully create`)
  setOpen(!open)
}

}, [title, price,qnt, desc, short, img, imgs])


  return (
    <Modal className='modalCreate' isOpen={open}>
    <div className='modDiv'>
        <form onSubmit={(ev) =>  ev.preventDefault()}>
            <span onClick={() => setOpen(!open)}>X</span>
            <input value={title} onChange={(ev) => setTitle(ev.target.value)} type='text' placeholder='Title' />
            <input value={desc} onChange={(ev) => setDesc(ev.target.value)} type='text' placeholder='Description' />
            <input value={short} onChange={(ev) => setShort(ev.target.value)} type='text' placeholder='Short Description' />
            <input value={price} onChange={(ev) => setPrice(ev.target.value)} type='number' placeholder='Price' />
            <input value={qnt} onChange={(ev) => setQnt(ev.target.value)} type='number' placeholder='Quantity' />
            <input value={img} onChange={(ev) => setImg(ev.target.value)} type='file' placeholder='Single Image' />
            <input value={imgs} onChange={(ev) => setImgs(ev.target.value)} type='file' placeholder='Images' />
            <button onClick={() => handleCreate(item)} type = 'submit'>Create</button>
        </form>
    </div>
</Modal>
  )
}
