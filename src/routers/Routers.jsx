import React, {memo} from 'react';
// import PropTypes from 'prop-types';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import history from '../history';
import Login from '../components/Page/Login/Login';
import Admin from './AdminRoute';
import Auth from './PrivateRoute';
import Home from '../components/Page/Home/Home';
import SchoolDetail from '../components/Page/SchoolDetail';
const Routers = () => {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/detail/:name" exact component={SchoolDetail} />
                    <Route path="/detail" exact component={SchoolDetail} />
                    <Route exact path="/login" render={() => <Login />} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/admin" component={Admin} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </div>
    );
};

Routers.propTypes = {

};

export default memo(Routers);