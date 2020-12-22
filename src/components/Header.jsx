import Axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Header.scss'
import Autocomplete from './Autocomplete/Autocomplete';
const Header = () => {
    const [listname, setListname] = useState([]);
    const getListSchoolNamefunc = useCallback(() => {
        Axios({
            method: "GET",
            url: "http://localhost:8080/api/public/getListSchoolName",

        }).then(
            res => {
                const data = res.data.data;
                setListname(data)
            }
        )
    }, [])
    useEffect(() => {
        getListSchoolNamefunc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div className="header">
                <div className="welcome">
                    <h2 style={{fontSize:"35px"}}>Chào mừng bạn đến với DNKID</h2>
                    <h2 style={{fontSize:"25px"}} >Website theo dõi thông tin và xếp hạng các trường mầm non tại quận Liên Chiểu</h2>
                </div>
                <div className="searchForm">
                    <div className="input-group md-form form-sm form-2">
                        <Autocomplete
                            options={listname} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;