import React, { useState, useEffect, useCallback } from 'react';
import Nav from '../Navbars/Nav';
import AuthNav from '../Navbars/AuthNav';
import Footer from '../Footer';
import { userService } from '../../services/UserService';
import CardSchoolInfomationByWardId from '../Cards/CardSchoolInfomationByWardId';

const ListSchoolByWard = (props) => {
    const { wardId, wardName } = props
    const [list, setList] = useState([]);
    // const [wardName, setWardName] = useState("");

    function pushDataFromAPIData(listSchool) {
        return listSchool.map((i) => {
            return {
                "schoolId": i.schoolId,
                "schoolName": i.schoolName,
                "image": i.image,
                "address": i.address,
                "tuition": i.tuition,
                "ward": i.ward,
                "phoneNumber": i.phoneNumber
            }
        })
    }
    const getSchoolByWardIdfunc = useCallback((wardId) => {
        userService.getSchoolByWardId(wardId).then(
            res => {
                const listschool = res;
                setList(pushDataFromAPIData(listschool));
            }
        )
    }, [])
    useEffect(() => {
        getSchoolByWardIdfunc(wardId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            {!localStorage.getItem("token") && <Nav></Nav>}
            {localStorage.getItem("token") && <AuthNav></AuthNav>}
            <div className="container">
                <p className="font-bold mt-2 mb-3" style={{ fontSize: "30px" }}>Danh sách các trường mầm non tại phường {wardName}</p>
                <CardSchoolInfomationByWardId data={list} />
            </div>


            <Footer />
        </div>
    );
};

export default ListSchoolByWard;