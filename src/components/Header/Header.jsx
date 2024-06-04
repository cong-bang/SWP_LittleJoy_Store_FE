import React from 'react'
import '../../assets/css/styleheader.css'
import logoshop from '../../assets/img/logoshop.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <>
        <div className="container-fluid header-content sticky-top">
        <div className="row">
            <div className="col-md-3 text-center">
                <a href="#" className="w-100"><img src={logoshop} alt="" className="w-25"/></a>
            </div>
            <div className="col-md-6 align-content-center d-flex justify-content-center">
                <div className="w-75 align-content-center">
                    <ul className="nav justify-content-around">
                        <li className="nav-item header-item">
                          <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item header-item">
                          <Link to="/shop" className="nav-link">Shop</Link>
                        </li>
                        <li className="nav-item header-item">
                          <Link to="/blog" className="nav-link">Blog</Link>
                        </li>
                        <li className="nav-item header-item">
                          <Link to="/about" className="nav-link">About</Link>
                        </li>
                      </ul>
                </div>
            </div>
            <div className="col-md-3 align-content-center">
                <div className="header-right d-flex justify-content-center">
                    <Link to="/cart" className="px-3"><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /></Link>
                    <Link to="/login" className="px-3">
                      <FontAwesomeIcon icon="fa-solid fa-user" /> <span className="px-1">Login</span>
                    </Link>
                </div>
            </div>
        </div>
        </div>
    </>
    

  )
}
