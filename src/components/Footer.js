import React from 'react';
import {Link} from 'react-router-dom';
import payPal from '../assets/img/card/payPal.png'
import visa from '../assets/img/card/VisaLogo.png'
import maestro from '../assets/img/card/maestroo.png';
import masterCard from '../assets/img/card/MasterCard.svg.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {

    const user = JSON.parse(localStorage.getItem("userData"))

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    return (
        <>
            <footer id="footer">
                <div className="section">
                    <div className="container">
                        <div className="row">
                            <div className="footer">
                                <h3 className="footerTitle">About Us</h3>
                                <p className="footerDesc">
                                    We are students at the Techno Educational Academy and this is our joint work for the project
                                </p>
                                <ul className="footerLinks">
                                    <li>
                                        <Link target='_blank'
                                              to="https://www.google.com/maps/place/Techno-Educational+Academy/@40.7855952,43.843743,15z/data=!4m2!3m1!1s0x0:0x9688d481af79919a?sa=X&ved=2ahUKEwjvuuSmvf_9AhWYQ_EDHdW4DM0Q_BJ6BAhDEAg">
                                            <LocationOnIcon style={{marginRight: 10}}/>
                                            Armenia, Gyumri</Link>
                                    </li>
                                    <li><Link to="tel:+021-95-51-84">
                                        <SettingsPhoneIcon style={{marginRight: 10}}/>+374-77-05-32-42</Link>
                                    </li>
                                    <li>
                                        <Link to="mailto:test@test.com">
                                            <EmailIcon style={{marginRight: 10}}/>
                                            edgarfrangulyan@gmail.com
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                            <div className="footer">
                                <h3 className="footerTitle">Categories</h3>
                                <ul className="footerLinks">
                                    <li>
                                        <Link to="#">Hot deals</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Laptops</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Smartphones</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Cameras</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Accessories</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer">
                                <h3 className="footerTitle">Information</h3>
                                <ul className="footerLinks">
                                    <li>
                                        <Link to="#">About Us</Link>
                                    </li>
                                   <li>
                                        <Link to = "#" >Contact Us</Link>
                                    </li>
                                     
                                    <li>
                                        <Link to="#">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Orders and Returns</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Terms & Conditions</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer fourth">
                                <h3 className="footerTitle">Service</h3>
                                <ul className="footerLinks">
                                    <li>
                                        <Link to="#">My Account</Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => goToTop()} to="/card">View Cart</Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => goToTop()} to="/likeproducts">Wishlist</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Track My Order</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Help</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="bottomFooter" className="section">
                    <div className="container">
                        <div className="row">
                            <div style={{textAlign: 'center'}}>
                                <ul className="footerPayments">
                                    <li>
                                        <Link to="#">
                                            <img src={visa} alt="card" className='paymentCards'/>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <img src={masterCard} alt="card" className='paymentCards'/>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <img src={maestro} alt="card" className='paymentCards'/>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="#">
                                            <img width={10} src={payPal} alt="card" className='paymentCards'/>
                                        </Link>
                                    </li>
                                </ul>
                                <span className="copyright">
                                     Copyright &copy;
                                    All rights reserved | This template is made by
                                    <strong className='creators'> Edgar Frangulyan</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

