import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, getUserInfo } from '../../actions/authActions';
// import {userService} from '../../services/UserService';
const UserDropdown = () => {
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-start",
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };
    const auth = useSelector(state => state.login);
    const dispatch = useDispatch();
    // const getUserInfofunc = () =>{

    // }
    useEffect(() => {
        dispatch(getUserInfo(localStorage.getItem("id")))
    }, [auth]);

    function handleClickLogout() {
        dispatch(logout())
    }
    return (
        <>
            <Link
                className="text-gray-600 block"
                to="#pablo"
                ref={btnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                <div className="items-center flex">
                    <span
                        className="w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full">
                        <img
                            alt="..."
                            className="w-full rounded-full align-middle border-none shadow-lg"
                            src={auth.avatar}
                        />
                    </span>
                </div>
            <strong>{auth.name}</strong>
            </Link>
            <div
                ref={popoverDropdownRef}
                className={
                    (dropdownPopoverShow ? "block " : "hidden ") +
                    "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                }
            >
                <Link
                    to="#pablo"
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
                    }
                    onClick={(e) => e.preventDefault()}
                >
                    Action
                </Link>
                <Link
                    to="#pablo"
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
                    }
                    onClick={(e) => e.preventDefault()}
                >
                    Another action
                </Link>
                <Link
                    to="#pablo"
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
                    }
                    onClick={(e) => e.preventDefault()}
                >
                    Something else here
                </Link>
                <div className="h-0 my-2 border border-solid border-gray-200" />
                <Link
                    to="/"
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
                    }
                    onClick={() => handleClickLogout()}
                >
                    Log out
                </Link>
            </div>
        </>
    );

};

export default UserDropdown;
