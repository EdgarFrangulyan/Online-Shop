import React, { useCallback, useEffect, useState } from 'react';
import { login } from '../store/actions/login';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import HomeIcon from '@mui/icons-material/Home';
import { basketList } from '../store/actions/basket';
import { likeList } from '../store/actions/likeProducts';
import Toast from '../components/Toast';



export default function Account() {
    const [logValue, setLogValue] = useState('');
    const [pasValue, setPasValue] = useState('');
    const dispatch = useDispatch();
    const token = useSelector((state) => state.login.token);
    const navigate = useNavigate();




    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        let error = 'Invalid email or password';
        const data = await dispatch(login({
            email: logValue,
            password: pasValue,
        }))
        if (!data.payload) {
            toast.error(error);
            return false;
        }
        if(token){
       await dispatch(basketList())
        await dispatch(likeList())      
        }
        navigate('/home');
    }, [logValue, pasValue]);

    return (
        <>
            <div className='signInPage'>
                <div className="box">
                    <span className="borderLine"></span>
                    <Link to='/' className="home">
                        <HomeIcon style={{ fontSize: 30, verticalAlign: 'sub' }} />
                    </Link>
                    <form onSubmit={(ev) => handleSubmit(ev)}>
                        <h2>Sign in</h2>
                        <div className="inputBox">
                            <input value={logValue} onChange={(ev) => setLogValue(ev.target.value)} type="email"
                                required="required" />
                            <span>Login</span>
                            <i />
                        </div>
                        <div className="inputBox password">
                            <input value={pasValue} onChange={(ev) => setPasValue(ev.target.value)} type="password"
                                required="required" />
                            <span>Password</span>
                            <i />
                        </div>
                        <div className="links">
                            <Link to="/register">Sign up</Link>
                        </div>
                        <input type="submit" value="Login" />
                    </form>
                    <Toast />
                </div>
            </div>
        </>
    )
}
