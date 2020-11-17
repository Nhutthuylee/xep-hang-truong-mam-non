import React from 'react';
import '../../styles/Nav.scss';
import { Link } from 'react-router-dom';
const Header = () => {
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
                                <Link className="btn-nav col-md-2" to={'/login'}><p className="navP">Đăng nhập</p></Link>
                                <Link className="btn-nav col-md-6" to={'/'}><button className="btn-create navP">Tạo tài khoản</button></Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;