import React, { useCallback, useState } from 'react'
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { delCategory, categoryList } from '../store/actions/productCategory';
import { toast } from 'react-toastify';

export default function DeleteCategory({i}) {
  
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true)
    const user = JSON.parse(localStorage.getItem("userData"))


    const handleDelete = useCallback(async(id) => {
if(user && user.role === 2){
  const data = await dispatch(delCategory(id))
    await dispatch(categoryList())
    if(data.payload){
    toast.success(data.payload.message)
    }
    setOpen(!open)
}
    }, [open, user])
  
    return (
    <Modal className='modalDelete' isOpen={open}>
<div className='modDiv'>
<span>Delete this category?</span>
<button onClick={() => handleDelete(i)}>Yes</button>
<button className='noBtn' onClick={() => setOpen(!open)}>No</button>
</div>
    </Modal>
  )
}
