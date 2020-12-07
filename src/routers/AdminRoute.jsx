import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../components/view/admin/Dashboard.jsx";
import Settings from "../components/view/admin/Settings.jsx";
import Tables from "../components/view/admin/Tables.jsx";
import AdminNavbar from '../components/Navbars/AdminNavbar';
// import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import TableSchool from '../components/view/admin/TableSchool.jsx';
import CommentManager from '../components/view/admin/CommentManager.jsx';

const AdminRoute = ({ component: Component, isSignedIn, currentUser }) => {
    // const isAdminPermission = isSignedIn
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-gray-200">
                <AdminNavbar />
                <div className="px-4">
                    <Switch>
                        <Route path="/admin/dashboard" exact component={Dashboard} />
                        <Route path="/admin/settings" exact component={Settings} />
                        <Route path="/admin/users" exact component={Tables} />
                        <Route path="/admin/schools" exact component={TableSchool} />
                        <Route path="/admin/comment/:id/:name" exact component={CommentManager} />
                        <Redirect from="/admin" to="/admin/dashboard" />
                    </Switch>
                </div>
            </div></>
    )
}
AdminRoute.propTypes = {

};

export default AdminRoute;


