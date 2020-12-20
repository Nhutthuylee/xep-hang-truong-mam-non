import React, { useState } from 'react';
import './Login/Login.scss';
import Swal from 'sweetalert2';
import history from '../../history';
import Axios from 'axios';
const ForgotPassword = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        acceptpass: ''
    });
    const [message, setMessage] = useState("");
    function handleChange(e) {
        setMessage("")
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    const handleError = (errorMsg) => {
        setMessage(errorMsg)
    }
    function handleSubmit(e) {
        e.preventDefault();
        const { acceptpass, email, password } = inputs;
        let rePassword = new RegExp("^[a-zA-Z][a-zA-Z0-9]{4,255}");
        if (!rePassword.test(password)) {
            handleError("Mật khẩu chưa đủ an toàn. Mật khẩu nên bắt đầu bằng chữ!!!!")
        } else {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("passwordAgain", acceptpass);
            Axios({
                method: "PUT",
                url: "http://localhost:8080/resetPassword",
                data: formData
            }).then(
                res => {
                    if (res.data.status === "FAILED") {
                        setMessage(res.data.message);
                    } else {
                        Swal.fire({
                            title: "Thay đổi mật khẩu thành công",
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
                                    Quên mật khẩu
                  </h2>
                            </div>
                            <hr className="mt-6 border-b-1 border-gray-400" />
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form onSubmit={handleSubmit}>
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
                                        Mật khẩu mới:
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
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Nhập lại mật khẩu mới:
                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password Again"
                                        name="acceptpass"
                                        value={inputs.acceptpass}
                                        required
                                        onChange={handleChange}
                                    />

                                </div>
                                <div className="message">

                                    <p className="text-center text-danger">{message}</p>
                                    {/* {console.log("loi", message)} */}
                                </div>

                                <div className="text-center mt-6">
                                    <button className='btn-signup' type="submit">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;