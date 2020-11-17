import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import AuthNav from '../components/Navbars/AuthNav';
import Home from '../components/Page/Home/Home';
import MultiStepForm from '../components/Page/ReviewPages/MultiStepForm';
import SchoolDetail from '../components/Page/SchoolDetail';

const PrivateRoute = () => {
    return (
        <div>
            <Switch>
                <Route path="/auth/home" exact component={Home} />
                <Route path="/auth/detail/:name" exact component={SchoolDetail} />
                <Route path="/auth/review" exact component={MultiStepForm} />
                <Redirect from="/auth" to="/auth/home" />
            </Switch>
        </div>
    );
};

export default PrivateRoute;