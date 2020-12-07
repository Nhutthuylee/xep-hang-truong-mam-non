import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import AuthNav from '../components/Navbars/AuthNav';
import Home from '../components/Page/Home/Home';
import PageReview1 from '../components/Page/ReviewPages/PageReview1';
import SchoolDetail from '../components/Page/SchoolDetail';
import Profile from '../components/view/auth/Profile';


const PrivateRoute = () => {
    return (
        <div>
            <Switch>
                <Route path="/auth/home" exact component={Home} />
                <Route path="/auth/detail/:name" exact component={SchoolDetail} />
                <Route path="/auth/review/:schoolid" exact component={PageReview1} />
                <Route path="/auth/profile" exact component={Profile} />
                <Redirect from="/auth" to="/auth/home" />
            </Switch>
        </div>
    );
};

export default PrivateRoute;