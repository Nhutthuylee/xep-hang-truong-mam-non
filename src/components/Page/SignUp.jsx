import React, { useState } from 'react';
import './Login/Login.scss';
import { userService } from '../../services/UserService';
import Swal from 'sweetalert2';
import history from '../../history';
const SignUp = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: ''
    });
    // const { email, password, name } = inputs;
    const [message, setMessage] = useState("");
    function handleChange(e) {
        setMessage("")
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    const handleError = (errorMsg) => {
        setMessage(errorMsg)
    }
    const handleSignUp = (e) => {
        e.preventDefault();
        // setSubmitted(true);
        const { name, email, password } = inputs;
        let rePassword = new RegExp("^[a-zA-Z][a-zA-Z0-9]{4,255}");
        if (!rePassword.test(password)) {
            handleError("Mật khẩu chưa đủ an toàn. Mật khẩu nên bắt đầu bằng chữ!!!!")
        }
        else {
            userService.signUp(name, email, password).then(
                res => {
                    if (res.data.status === "FAILE") {
                        Swal.fire({
                            title: res.data.message,
                            icon: "error",
                        })

                    } else {
                        Swal.fire({
                            title: "Đăng kí thành công",
                            icon: "success",
                            confirmButtonText: "Hoàn Thành",
                        }).then(
                            result => {
                                if (result.isConfirmed) {
                                    history.push("/")
                                }
                            }
                        )
                    }
                }
            )
        }
    }
    return (
        <div className="mx-auto mt-4 px-4 h-full">
            <div className="flex login_page content-center items-center justify-center h-full">
                <div className="w-full px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h2 className="font-italic text-600 text-sm font-bold">
                                    CỬA SỔ ĐĂNG KÝ
                  </h2>
                            </div>
                            <hr className="mt-6 border-b-1 border-gray-400" />
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form onSubmit={handleSignUp}>
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Tên:
                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        name="name"
                                        value={inputs.name}
                                        required
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Email:
                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder="Email"
                                        name="email"
                                        value={inputs.email}
                                        required
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Mật khẩu:
                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        name="password"
                                        value={inputs.password}
                                        required
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            id="customCheckLogin"
                                            type="checkbox"
                                            className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                        />
                                        <span className="ml-2 text-sm font-semibold text-gray-700">
                                            I agree with the{" "}
                                            <a
                                                href="#pablo"
                                                className="text-blue-500"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                Privacy Policy
                        </a>
                                        </span>
                                    </label>
                                </div>
                                <div className="message">

                                    <p className="text-center text-danger">{message}</p>
                                    {/* {console.log("loi", message)} */}
                                </div>

                                <div className="text-center mt-6">
                                    <button className='btn-signup' type="submit">Create Account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;