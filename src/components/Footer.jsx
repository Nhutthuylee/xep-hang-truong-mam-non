import React from 'react';
import '../styles/Footer.scss';

const Footer = () => {
    const footerLogo = require('../img/logo-web-2.PNG');
    return (
        <div>
            <div className="container" style={{ marginBottom: "0px" }}>
                <footer className="page-footer font-small blue pt-4">

                    <div className="container-fluid text-center text-md-left">

                        <div className="row">

                            <div className="footer-logo col-md-4 mt-md-0 mt-3">

                                <img src={footerLogo} alt="footer" style={{ width: "200px", height: "80px" }}></img>
                            </div>

                            <hr className="clearfix w-100 d-md-none pb-3" />

                            <div className="col-md-2 mb-md-0 mb-3">

                                <h5 className="btn-foo mb-2">Links</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="#!">Pricing</a>
                                    </li>
                                    <li>
                                        <a href="#!">Term of service</a>
                                    </li>
                                    <li>
                                        <a href="#!">Privacy</a>
                                    </li>

                                </ul>
                            </div>

                            <div className="col-md-2 mb-md-0 mb-3">

                                <h5 className="btn-foo mb-2">Company</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="#!">About us</a>
                                    </li>
                                    <li>
                                        <a href="#!">Careers</a>
                                    </li>
                                    <li>
                                        <a href="#!">Articles</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4 mb-md-0 mb-3">

                                <h5 className="btn-foo md-2">Get in touch</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="#!">Thắc mắc về hệ thống xin liên hệ</a>
                                    </li>
                                    <li>
                                        <h5><a href="#!" className="mail">thuy.lenhut@gmail.com</a></h5>
                                    </li>
                                    <li className="center-block">
                                        <a className="foo-icon" href="#!"><i className="mr-3 fa fa-facebook-square"></i></a>
                                        <a className="foo-icon" href="#!"><i className="mr-3 fa fa-twitter"></i></a>
                                        <a className="foo-icon" href="#!"><i className="mr-3 fab fa-linkedin-in "></i></a>
                                    </li>

                                </ul>
                            </div>

                        </div>

                    </div>

                </footer>
            </div>
        </div>
    );
};

export default Footer;