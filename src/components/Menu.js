import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from 'react-router-dom';
import { categoryList, prodCategory, delCategory } from '../store/actions/productCategory';
import { slide as Burger } from 'react-burger-menu'
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import Toast from './Toast';
import Modal from 'react-modal'
import { addCategory } from '../store/actions/productCategory';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import CreateProduct from './CreateProduct';
import DeleteCategory from './DeleteCategory';



function Menu() {
    const [isOpen, setIsOpen] = useState(null);
    const catList = useSelector((state) => state.category.catList);
    const category = useSelector((state) => state.category.category);
    const user = JSON.parse(localStorage.getItem("userData"))
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [add, setAdd] = useState(false)
    const [value, setValue] = useState('')
    const [child, setChild] = useState('')
    const [show, setShow] = useState(false)
    const [prod, setProd] = useState(null) 
    const [del, setDel] = useState(null)
   const [remove, setRemove] = useState(null)
   


    useEffect(() => {
        (async () => {
            await dispatch(categoryList());
        })()
    }, [categoryList]);



    const toggle = useCallback((id) => {
        setIsOpen(isOpen === id ? null : id);

    }, [isOpen]);

    const handleClick = useCallback(async (el) => {
        await dispatch(prodCategory(el.id))
        navigate(`/category/${el.id}`)
        setIsOpen(null)
    }, [])

    const handleAdd = useCallback(async () => {

        if (!value.length) {
            return null
        }

       await dispatch(addCategory({
            title: value
        }))
       toast.success(`Category ${value} added`)
        await dispatch(categoryList())
    }, [value])



    const handleDel = useCallback((id) => {
        setDel(del === id ? null : id)
    }, [del])

    const handleDelete = useCallback((id) => {
setRemove(remove === id ? null : id)
    }, [remove])


    const handleChild = useCallback(async (id) => {

        await dispatch(addCategory({
            title: child,
            parentId: id
        }))
        toast.success('Child succesfully added')
        await dispatch(categoryList())
    }, [child])

    const handleProduct = useCallback((id) => {
        setProd(prod === id ? null : id);
     
    }, [prod])

  



    return (
        <div className='nav'>
            <Toast />
            <MenuIcon style={{ fontSize: 50, color: 'white' }} onClick={toggle} />
            <Burger className="bm-menu-wrap nav">
                {user && user.role === 2 ?
                    <ul className="bm-item nav__block">
                        <li className="nav__list">
                            <button onClick={() => setAdd(!add)} className="nav__link">Add Category</button>
                        </li>
                    </ul>
                    : null}
                {add ?
                    <div className='addCat'>
                        <input value={value} onChange={(ev) => setValue(ev.target.value)} type='text' placeholder='Category' />
                        <button onClick={() => handleAdd()}><AddIcon style={{ fontSize: 23 }} /></button>
                    </div>
                    :
                    null
                }
                {catList.map((items) => (
                    <ul key={items.id} className="bm-item nav__block">
                        <li className="nav__list">
                            <button onClick={() => toggle(items.id)} className="nav__link">{items.title}</button>
                            {user && user.role === 2 ? <span onClick={() => handleDelete(items.id)}><PlaylistRemoveIcon style={{ fontSize: 30 }} /></span> : null}
                        </li>
                            {remove === items.id ?   
                        <DeleteCategory i ={items.id}/>
                        :
                        null    
                        }
                        {isOpen === items.id ?
                            <div>
                                {user && user.role === 2 ?
                                    <ul className="bm-item nav__block">
                                        <li className="nav__list">
                                            <button onClick={() => setShow(!show)} className="nav__link">Add Child</button>

                                        </li>
                                    </ul>
                                    : null}
                                {show ?
                                    <div className='addCat'>
                                        <input value={child} onChange={(ev) => setChild(ev.target.value)} type='text' placeholder='Child Name' />
                                        <button onClick={() => handleChild(items.id)}><AddIcon style={{ fontSize: 23 }} /></button>
                                    </div>
                                    :
                                    null
                                }
                                {items.child.map((item) => (
                                    <div key={item.id}>
                                        <div>
                                            {user && user.role === 2 ?
                                                <div className='childMenu' onClick={(e) => e.stopPropagation()}>
                                                    <span onClick={() => handleDel(item.id)}>
                                                        <PlaylistRemoveIcon style={{ fontSize: 30, color: 'black' }} />
                                                    </span>
                                                    <span onClick={() => handleProduct(item.id)}><AddIcon style={{ fontSize: 30, color: 'black' }} /></span>
                                                    {prod === item.id  ?  
                                                    <CreateProduct  item = {item.id} />
                                                        : null}
                                                       {del === item.id ? 
                                                       <DeleteCategory i = {item.id}/>
                                                    
                                                       : null}
                                                </div>
                                                : null}
                                        </div>
                                        <button className='childBtn' onClick={() => handleClick(item)}>{item.title}
                                        </button>
                                        <hr style={{ color: 'black' }}></hr>
                                    </div>
                                ))}
                            </div>
                            : null}
                    </ul>
                ))}
            </Burger>
        </div>
    )

}


export default Menu;