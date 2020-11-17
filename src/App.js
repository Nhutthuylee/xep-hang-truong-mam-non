import React from 'react';
import './App.scss';
import './routers/Routers';
import Routers from './routers/Routers';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

toast.configure();
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
    },
    err => Promise.reject(err)
);

function App() {
    return ( < div className = "App" >
        <Routers />
        </div>
    );
}

export default App;