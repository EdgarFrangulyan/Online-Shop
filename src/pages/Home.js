import React from 'react';
import Wrapper from '../components/Wrapper';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Admin from './Admin';
import AdminHeader from '../components/AdminHeader';
import AdminWrapper from '../components/AdminWrapper';



export default function Home() {

const user = JSON.parse(localStorage.getItem("userData"))

console.log(user)


    return (
        <>
             {user && user.role === 2 ? <AdminHeader/> : <Header />}
           {user && user.role === 2 ? <AdminWrapper/> : <Wrapper/>}
             {user && user.role === 2 ? null : <Footer />   }       
        </>
    )
}
