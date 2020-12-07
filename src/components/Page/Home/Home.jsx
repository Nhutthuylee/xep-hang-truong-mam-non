import './Home.scss';
import React from 'react';
import Footer from '../../Footer';
import Header from '../../Header';
import ListRankingSchool from '../../view/public/ListRankingSchool';
import Nav from '../../Navbars/Nav';
import AuthNav from '../../Navbars/AuthNav';
import MenuSearch from '../../Sidebar/MenuSearch';
const Home = () => {
    return (
        <div>
            {!localStorage.getItem('token') && <Nav />}
            {localStorage.getItem('token') && <AuthNav />}
            <Header />
            <div className="container">
                <div className="ranking_area row">
                    <div className="col-md-4">
                        <MenuSearch />
                    </div>
                    <div className="col-md-8">
                        <ListRankingSchool />
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Home;