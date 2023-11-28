import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/img/logo/Hebb.svg';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {searchProducts} from '../store/actions/products';
import useTypewriter from "react-typewriter-hook";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {basketList} from '../store/actions/basket';
import {likeList} from '../store/actions/likeProducts';
import LoginIcon from '@mui/icons-material/Login';
import Menu from './Menu';
import AddIcon from '@mui/icons-material/Add';
import PaymentIcon from '@mui/icons-material/Payment';
import LoadingBar from "react-top-loading-bar";

let index = 0;
const typing = [
    "Laptops...",
    "Electronics...",
    "Telephones...",
    "Clothes..."
];

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const [placeholderValue, setPlaceholderValue] = useState("Search here...");
    const token = localStorage.getItem("userToken");
    const user = JSON.parse(localStorage.getItem("userData"))
    const intervalRef = useRef({});
    const ref = useRef();
    const hints = useTypewriter(placeholderValue);
    const basket = useSelector((state) => state.basket.basket);
    const likes = useSelector((state) => state.likes.likes);
    const stickyHeader = useRef();
    const progress = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!ref?.current?.contains(event.target)) {
                setOpen(false);
            }
        }
        window.addEventListener('click', handleOutsideClick);
    }, [ref]);


    useEffect(() => {
        (async () => {
            if (token) {
                await dispatch(basketList());
                await dispatch(likeList());
            }
        })()
    }, [basketList, likeList]);


    useEffect(
        () => {
            intervalRef.current = setInterval(() => {
                // index = index + 1 > 2 ? 0 : ++index + 1;
                index = index > 2 ? 0 : ++index;
                setPlaceholderValue(typing[index]);
            }, 10000);
            return function clear() {
                clearInterval(intervalRef.current);
            };
        }, [placeholderValue]);

    useLayoutEffect(() => {
        const mainHeader = document.getElementById('header');
        let fixedTop = stickyHeader.current?.offsetTop;
        stickyHeader.current.animation = 'bubble';
        const fixedHeader = () => {
            if (window?.pageYOffset > fixedTop) {
                mainHeader?.classList.add('fixedTop');
            } else {
                mainHeader?.classList.remove('fixedTop');
            }
        }
        window.addEventListener('scroll', fixedHeader);
    }, []);

    const toggle = useCallback((open) => {
        setOpen(!open);
    }, []);


    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (value.length) {
        await dispatch(searchProducts({
                q: value,
                page: 1
            }));
            const product = '/products?q=';
            navigate(`${product}${value}`);
        } else {
            return null;
        }
    }, [value]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        navigate('/');
    }, []);

    useEffect(() => {
        progress?.current?.continuousStart();
        progress?.current?.staticStart();
        progress?.current?.complete();
    }, []);

    return (
        <>
            <header className='allHeader'>
                <div id="topHeader">
                    <LoadingBar color="#f11946" ref={progress} shadow/>
                    <div className="container">
                        <div className="topHeaderLinks">
                            <ul className="headerLinks">
                                <li className='listItemStyle'>
                                    <Link to='tel:+37477053242' className='phoneNumber'>
                                        <PhoneIcon style={{fontSize: 30, color: 'white'}}/>
                                    </Link>
                                </li>
                                <li>
                                    <span className='userName'>{user ? `${user.fname} ${user.lname}` : null}</span>
                                    <AccountCircleIcon
                                        ref={ref}
                                        onClick={() => toggle(open)}
                                        style={{fontSize: 40, color: '#fff', cursor: 'pointer'}}/>
                                    {open ?
                                        <div>
                                            {token ?
                                             <div style={{position: 'absolute'}}>
                                                <ul className="dropdownMenu" style={{right:-147}}>
                                                    <span className='triangle'></span>
                                                    <li className="menu-item">
                                                        <button onClick={() => handleLogout()}>
                                                            <LogoutIcon style={{fontSize: 30}}/>LogOut
                                                        </button>
                                                    </li>
                                                    <li className="menu-item">
                                                        <button onClick={() => navigate('/payment')}>
                                                            <PaymentIcon style={{fontSize: 30}}/> Payment
                                                        </button>
                                                    </li>
                                                    {user.role === 2 ? (
                                                        <li className="menu-item">
                                                            <button onClick={() => navigate('/admin')}>
                                                                <AddIcon style={{fontSize: 30}}/>Add product
                                                            </button>
                                                        </li>
                                                    ) : null}
                                                </ul>
                                                </div>
                                                :
                                                <div style={{position: 'absolute'}}>
                                                <ul className="dropdownMenu" style={{right:-5}}>
                                                    <span className='triangle'></span>
                                                    <li className="menu-item">
                                                        <button onClick={() => navigate('/register')}>
                                                            <PersonAddIcon style={{fontSize: 30}}/>
                                                            Registration
                                                        </button>
                                                    </li>
                                                    <li className="menu-item">
                                                        <button onClick={() => navigate('/account')}>
                                                            <LoginIcon style={{fontSize: 30}}/>
                                                            Login
                                                        </button>
                                                    </li>
                                                </ul>
                                                </div>
                                            }
                                        </div>
                                        : null}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="header" ref={stickyHeader}>
                    <div className="container">
                        <div className="headerLine">
                            <div className="menu">
                                <Menu/>
                            </div>
                            <div className="headerLogo">
                                <Link to="/" className="logo">
                                    <img src={logo} alt="logo" className='imgLogo'/>
                                </Link>
                            </div>
                            <div className="headerSearch">
                                <form onSubmit={(event) => handleSubmit(event)}>
                                    <label>
                                        <input
                                            value={value}
                                            onChange={(ev) => setValue(ev.target.value)}
                                            type='search'
                                            className="input"
                                            placeholder={hints}
                                        />
                                    </label>
                                    <button type='submit' className="searchBtn">
                                        <SearchIcon style={{fontSize: 30}}/>
                                    </button>
                                </form>
                            </div>
                            <div className="clearfix">
                                <div className="headerCtn">
                                    <div className='likeCorner'>
                                        <a href='/likeproducts' className='btnIcon'>
                                            <FavoriteIcon style={{fontSize: 40, color: 'red'}}/>
                                            <span className="qty liked">{token ? likes.length : 0}</span>
                                        </a>
                                    </div>
                                    <div className='cartCorner'>
                                        <button onClick={() => navigate('/card')} className='btnIcon'>
                                            <ShoppingCartIcon style={{fontSize: 40, color: 'white'}}/>
                                            <span className="qty cart">{token ? basket.length : 0}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
