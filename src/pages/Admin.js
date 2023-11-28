import { AssistWalkerTwoTone } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Toast from '../components/Toast';
import { addCategory, categoryChild, categoryList } from '../store/actions/productCategory';
import { addProduct } from '../store/actions/products';


export default function Admin() {

  const [value, catValue] = useState('');
  const [brand, setBrand] = useState('');
  const [desc, setDesc] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [imgs, setImgs] = useState('');
  const [qnt, setQnt] = useState('');
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [menu, setMenu] = useState(false);
  const [prod, setProd] = useState(false);
  const [down, setDown] = useState(false);
  const [child, setChild] = useState([]);
  const list = useSelector((state) => state.category.catList);
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const childs = list.map((ch) => ch.child);



  
  useEffect(() => {
    (async () => {
      await dispatch(categoryList())

    })()
  }, [])


  const handleSubmit = useCallback((ev) => {
    ev.preventDefault()

  }, [])



const handleOpen = useCallback((el) => {

  setChild(el.child)


}, [])



  const handleClick = useCallback(async (el) => {
  
console.log(el)





        if (userData.role === 2) {
          const data = await dispatch(addProduct({
            title: brand,
            image: img,
            images: [imgs],
            description: desc,
            price: price,
            quantity: qnt,
            short_desc: shortDesc,
            cat_id: el
          }))

          if(data.payload.product){
toast.success('Product added successfully')
          }
        }
        
  }, [qnt, imgs, img, desc, brand, shortDesc, price,])


const handleAdd = useCallback(async(el) => {

  const data = await dispatch(addCategory({
   title: value,
   parentId: el.id
  }))
console.log(data)
}, [value])


  const handleSub = useCallback((ev) => {
    ev.preventDefault()

  }, [])






  return (

    <div className='productMenu'>
      <div className='bigContainer'>
        <div className='mainContent'>
          <div className='product'>
            <Toast/>
            <button onClick={() => setOpen(!open)} className='addButton'>Add Product</button>
            {open ? (
              <form onSubmit={(ev) => handleSubmit(ev)}>
                <div className='smallContainer'>
                  <input value={brand} onChange={(ev) => setBrand(ev.target.value)} type='text' placeholder='Brand' />
                  <input value={price} onChange={(ev) => setPrice(ev.target.value)} type='number' placeholder='Price' />
                  <input value={qnt} onChange={(ev) => setQnt(ev.target.value)} type='number' placeholder='Quantity' />
                  <input value={desc} onChange={(ev) => setDesc(ev.target.value)} type='text' placeholder='Product Description' />
                  <input value={shortDesc} onChange={(ev) => setShortDesc(ev.target.value)} type='text' placeholder='Short Description' />
                  <input value={img} onChange={(ev) => setImg(ev.target.value)} type='url' placeholder='Single Image URL' />
                  <input value={imgs} onChange={(ev) => setImgs(ev.target.value)} type='file' placeholder='Images URL' />
                  <button onClick={() => setProd(!prod)} className='addButton'>Add In</button>
                  {prod ?
                    <div>
                      {list.map((l) => (
                        <div key={l.id}>
                          <button onClick={() => handleOpen(l, setDown(!down))}>{l.title}</button>
{down ?   
<div>
{child.map((ch) => (
  ch.parentId === l.id ? <button onClick={() => handleClick(ch.id)} key={ch.id}>{ch.title}</button> : null
))}
</div>
:
null
}
                        </div>
                      ))}
                    </div>
                    :
                    null
                  }
                </div>
              </form>
            ) : null}
          </div>
          <div className='category'>
            <button onClick={() => setAdd(!add)} className='addButton'>Add Category</button>
            {add ?
              (
                <form onSubmit={(ev) => handleSub(ev)}>
                  <div>
                    <input value={value} onChange={(ev) => catValue(ev.target.value)} type='text' placeholder='Your Category Title' />
                    <button onClick={() => setMenu(!menu)} className='addButton'>Add In</button>
                    {menu ?
                      <div>
                        {list.map((l) => (
                          <div key={l.id}>
                            <button onClick={() => handleAdd(l)}>{l.title}</button>
                          </div>
                        ))
                        }
                      </div>
                      :
                      null
                    }
                  </div>
                </form>
              )
              :
              null
            }
          </div>
        </div>
      </div>
    </div>
  )
}
