import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Nav.scss';
import UserDropdown from '../Dropdowns/UserDropdown';

const AuthNav = () => {
    const logo = require('../../img/logo-web-1.PNG');
    return (
        <div>
            <div className="green-line"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav className="navbar navbar-light row">
                            <div className="col-md-7 row">
                                <a className="btn-nav" href="/"><h5><img src={logo} alt="logo" style={{ width: "200px", height: "80px" }}></img></h5></a>
                            </div>
                            <div className="col-md-5 row">
                                <Link className="btn-nav col-md-4" to={'/'}><p className="navP">Về DNKID</p></Link>
                                <Link className="btn-nav col-md-2" to={'/login'}><p className="navP"></p></Link>
                                <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                                    <UserDropdown />
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthNav;