import React from 'react'
import Header from "../components/Header";
import {Link} from "react-router-dom";
import Footer from "../components/Footer";

export default function NotFound() {
    return (
        <>
            <Header/>
            <div className="errorBlock">
                <div className="container" style={{textAlign: "center"}}>
                    <div className='image'/>
                    <div className="bottomSide">
                        <Link to="/" className='homeButtonStyle'>Go to Home</Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
