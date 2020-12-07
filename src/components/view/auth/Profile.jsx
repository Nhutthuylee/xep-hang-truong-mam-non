import React, { memo, useCallback, useEffect, useState } from 'react';
import CardSettings from '../../Cards/CardSettings';
import CardProfile from '../../Cards/CardProfile';
import AuthNav from '../../Navbars/AuthNav';
import Footer from '../../Footer';
import { userService } from '../../../services/UserService';
const Profile = () => {
    const id = localStorage.getItem("id")
    const [info, setInfo] = useState([]);
    const getUserfunc = useCallback((id) => {
        userService.getUserInfo(id).then(
            res => {
                setInfo(res)
                console.log("data",res)
            }
        )
    },[])
    useEffect(() => {
        // dispatch(getUserInfo(id))
        getUserfunc(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const refetchData = useCallback(() => getUserfunc(id), [getUserfunc, id])
    return (
        <>
            <AuthNav></AuthNav>
            <div className=" container flex flex-wrap pt-12">
                <div className="w-full lg:w-8/12 px-4">
                    <CardSettings data={info} refetchData={refetchData} />
                </div>
                <div className="w-full lg:w-4/12 px-4">
                    <CardProfile data={info} refetchData={refetchData} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default memo(Profile);