import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import history from '../history';
import Login from '../components/Page/Login/Login';
import Admin from './AdminRoute';
import Auth from './PrivateRoute';
import Home from '../components/Page/Home/Home';
import SchoolDetail from '../components/Page/SchoolDetail';
import SignUp from '../components/Page/SignUp';
import ListSchoolByWard from '../components/Page/ListSchoolByWard';
import ForgotPassword from '../components/Page/ForgotPassword';
const Routers = () => {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/detail/:name" exact component={SchoolDetail} />
                    <Route path="/detail" exact component={SchoolDetail} />
                    <Route exact path="/login" render={() => <Login />} />
                    <Route exact path="/signup" render={() => <SignUp />} />
                    <Route exact path="/forgot-password" render={() => <ForgotPassword />} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/truong-tai-phuong-hoa-minh" exact render={() => <ListSchoolByWard wardId={1} wardName={"Hòa Minh"} />} />
                    <Route path="/truong-tai-phuong-hoa-khanh-nam" exact render={() => <ListSchoolByWard wardId={2} wardName={"Hòa Khánh Nam"} />} />
                    <Route path="/truong-tai-phuong-hoa-khanh-bac" exact render={() => <ListSchoolByWard wardId={3} wardName={"Hòa Khánh Bắc"} />} />
                    <Route path="/truong-tai-phuong-hoa-hiep-nam" exact render={() => <ListSchoolByWard wardId={4} wardName={"Hòa Hiệp Nam"} />} />
                    <Route path="/truong-tai-phuong-hoa-hiep-bac" exact render={() => <ListSchoolByWard wardId={5} wardName={"Hòa Hiệp Bắc"} />} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </div>
    );
};

Routers.propTypes = {

};

export default memo(Routers);