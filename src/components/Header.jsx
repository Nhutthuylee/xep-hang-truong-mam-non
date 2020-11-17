import React from 'react';
import '../styles/Header.scss'
const Header = () => {
    return (
        <>
            <div className="header">
                <div className="welcome">
                    <h2>Chào mừng bạn đến với DNKID</h2>
                </div>
                <div className="searchForm">
                    <div className="input-group md-form form-sm form-2">
                        <input className="form-control my-0 red-border" type="text" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <span className="input-group-text red lighten-3" id="basic-text1"><i className="fas fa-search text-grey" aria-hidden="true" /></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;