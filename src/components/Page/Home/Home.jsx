import './Home.scss';
import React from 'react';
import Footer from '../../Footer';
import Header from '../../Header';
import ListRankingSchool from '../../view/public/ListRankingSchool';
import Nav from '../../Navbars/Nav';
import AuthNav from '../../Navbars/AuthNav';
const Home = () => {
    return (
        <div>
            {!localStorage.getItem('token')&& <Nav/>}
            {localStorage.getItem('token')&& <AuthNav/>}
            <Header />
            <div className="ranking_area">
                <ListRankingSchool />
            </div>
            <Footer />
        </div>
    );
};

export default Home;