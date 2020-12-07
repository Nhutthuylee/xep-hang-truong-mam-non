/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import './Login.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../actions/authActions';
import { Link } from 'react-router-dom';
import {userService} from '../../../services/UserService';
const Login = (props) => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [message, setMesssage] = useState("")

    const dispatch = useDispatch();
    useEffect(() => {
        document.title = 'WELCOME TO DNKID';

    }, []);

    const handleError = (errorMsg) => {
        setMesssage(errorMsg)
    }
    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = inputs;
        let rePassword = new RegExp("^[a-zA-Z][a-zA-Z0-9]{4,255}");
        if (password === "") {
            handleError("Vui lòng nhập mật khẩu")
        } else if (!rePassword.test(password)) {
            handleError("Mật khẩu chưa chính xác")
        }
        else {
            dispatch(login(email, password));
            userService.callLoginApi(email, password).then(
                ([res, msg])=>{
                    handleError(msg)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                }
            )
        }
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    // const handleEmailValueChange = event => setEmail(event.target.value);
    // const handlePassWordValueChange = event => setPassword(event.target.value);
    return (

        <div className="login_space px-4">
            <div className="login_page">
                <div className="form">
                    <div className="ad_logo">
                        <h2 className="font-italic">DNKID</h2>
                    </div>
                    <form className="login_form" onSubmit={handleLogin}>
                        <div>
                            <label className="text-gray-700" htmlFor="Email">Email:</label>
                            <input type="email"
                                id="Email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                required
                                onChange={handleChange}
                                name="email" className={'form-control'}
                            />

                        </div>
                        <div>
                            <label className="text-gray-700" htmlFor="password">Password:</label>
                            <input type="password"
                                name="password"
                                placeholder="password"
                                required
                                onChange={handleChange}
                                className={'form-control'} />

                        </div>

                        <div className="message">

                            <p className="text-center text-danger">{message}</p>
                            {/* {console.log("loi", message)} */}
                        </div>
                        <button type="submit">login</button>
                    </form>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                    <div className="w-1/2">
                        <a
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            className="text-300"
                        >
                            <small>Forgot password?</small>
                        </a>
                    </div>
                    <div className="w-1/2 text-right">
                        <Link to="/signup" className="text-300">
                            <small>Create new account</small>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;