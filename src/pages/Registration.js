import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { register } from '../store/actions/registration';
import { useNavigate, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Toast from '../components/Toast';


export default function Registration() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [age, setAge] = useState('');
    const regex = /[a-z]([0-9]|[a-z]){5,16}[@][m][a][i][l][.][r][u]/



    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();


       if(regex.test(email) === false){
       toast.error('Email is not correct')
       return
       }


        if (password !== rePassword) {
            toast.error('Password is not unique')
            return
        }

        if (password.length < 6) {
            toast.error('Password length is not small than 6')
            return
        }



        await dispatch(register({
            fname: fName,
            lname: lName,
            email: email,
            username: userName,
            password: password,
            age: age,
            role: "6",
        }))

        navigate('/account')


    }, [fName, lName, password, userName, age, email, rePassword])


    return (
        <>
            <div className='registrationPage'>
                <div className="registrationBox">
                    <span className="borderLine"></span>
                    <Link to='/' className="home">
                        <HomeIcon style={{ fontSize: 30, verticalAlign: 'sub' }} />

                    </Link>
                    <form onSubmit={(ev) => handleSubmit(ev)}>
                        <h2>Registration</h2>
                        <div className="registrationInputBox">
                            <input value={fName} onChange={(ev) => setFName(ev.target.value)} type="text"
                                required="required" />
                            <span>First name</span>
                            <i />
                        </div>
                        <div className="registrationInputBox">
                            <input value={lName} onChange={(ev) => setLName(ev.target.value)} type="text"
                                required="required" />
                            <span>Last name</span>
                            <i />
                        </div>
                        <div className="registrationInputBox">
                            <input value={email} onChange={(ev) => setEmail(ev.target.value)} type="email"
                                required="required" />
                            <span>Email</span>
                            <i />
                        </div>
                        <div className="registrationInputBox">
                            <input value={age} onChange={(ev) => setAge(ev.target.value)} type="number" min='18'
                                max='100' required="required" />
                            <span>Age</span>
                            <i />
                        </div>
                        <div className="registrationInputBox">
                            <input value={userName} onChange={(ev) => setUserName(ev.target.value)} type="text"
                                required="required" />
                            <span>User name</span>
                            <i />
                        </div>
                        <div className="registrationInputBox">
                            <input value={password} onChange={(ev) => setPassword(ev.target.value)} type="password"
                                required="required" />
                            <span>Password</span>
                            <i />
                        </div>
                        <div className="registrationInputBox last">
                            <input value={rePassword} onChange={(ev) => setRePassword(ev.target.value)}
                                type="password"
                                required="required" />
                            <span>Repeat Password</span>
                            <ToastContainer position='top-left'
                                autoClose={500}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="dark" />
                            <i />
                        </div>
                        <div className="links">
                            <Link to="/account">Sign in</Link>
                        </div>
                        <input type="submit"
                            className='submitInput'
                            value="Confirm" />
                    </form>
                </div>
            </div>
        </>
    )
}