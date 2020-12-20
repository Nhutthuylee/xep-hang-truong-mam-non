import Axios from "axios";
import React, { memo, useState, useEffect } from "react";
import Swal from 'sweetalert2';
import history from '../../history';

// components
const CardSettings = (props) => {
    const { data } = props

    const id = localStorage.getItem("id");
    const [inputs, setInputs] = useState(data);
    const [error, setError] = useState("");
    const [pass, setPass] = useState({
        nowpassword: '',
        newpassword: '',
        newpasswordAgain: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        let newInputs = { ...inputs };
        newInputs[name] = value;
        setInputs(newInputs);
        setError("");
    }
    function handleChangePass(e) {
        const { name, value } = e.target;
        let newPass = { ...pass };
        newPass[name] = value;
        setPass(newPass);
        setError("");
    }
    const handleError = (errorMsg) => {
        setError(errorMsg);
    }
    const handleEditPassSubmit = (e) => {
        e.preventDefault();
        const { nowpassword, newpassword, newpasswordAgain } = pass;
        let rePassword = new RegExp("^[a-zA-Z][a-zA-Z0-9]{4,255}");
        if (!rePassword.test(newpassword)) {
            handleError("Mật khẩu chưa hợp lệ")
        } else if (newpasswordAgain === "") {
            handleError("Hãy nhập lại mật khẩu mới.")
        } else {
            const formData = new FormData();
            formData.append("id", id)
            formData.append("nowPassword", nowpassword);
            formData.append("newPassword", newpassword);
            formData.append("newPasswordAgain", newpasswordAgain);
            Axios({
                method: 'PUT',
                url: "http://localhost:8080/changePassword",
                data: formData
            }).then(
                res => {
                    if (res.data.status === "FAILED") {
                        setError(res.data.message);
                    } else {
                        Swal.fire({
                            title: "Thay đổi mật khẩu thành công",
                            icon: "success",
                            confirmButtonText: "Hoàn Thành",
                        }).then(
                            result => {
                                if (result.isConfirmed) {
                                    props.refetchData()
                                    setPass({
                                        nowpassword: '',
                                        newpassword: '',
                                        newpasswordAgain: ''
                                    })
                                }
                            }
                        )
                    }
                }
            )
        }
    }

    useEffect(() => {
        setInputs(data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-gray-800 text-xl font-bold">Giới thiệu: </h6>
                        {/* <button
                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Update
            </button> */}
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                            Chi tiết về bạn
            </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Tên:
                  </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                        defaultValue={data.name}
                                        value={inputs.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Email:
                  </label>
                                    <input
                                        type="email"
                                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow disabled focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                        value={data.email}
                                    />
                                </div>
                            </div>

                        </div>

                        <hr className="mt-6 border-b-1 border-gray-400" />

                        <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                            Thông tin địa chỉ
            </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                        value={inputs.address}
                                        // defaultValue="Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                        </div>

                        <hr className="mt-6 border-b-1 border-gray-400" />

                        <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                            Quản lý password
            </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <div className="pass row">
                                        <div className="col-md-1"><i className="fas fa-key fa-2x"></i></div>
                                        <div className="col-md-11">
                                            <h4 className="text-md font-bold"> Đổi mật khẩu</h4>
                                            <span className="text-gray-700 text-sm">Bạn nên sử dụng mật khẩu mạnh mà mình chưa sử dụng ở đâu khác</span>
                                        </div>

                                    </div>
                                    <hr className=" mt-2 border-b-1 border-gray-400 mb-3"></hr>
                                    <div className="changepass">

                                        <button className="bg-blue-500 text-white active:bg-blue-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" data-toggle="collapse" data-target="#changePass" aria-expanded="false" aria-controls="changePass">Chỉnh sửa</button>
                                        <div className="collapse" id="changePass">
                                            <div className="form_">
                                                <div className="relative w-full mb-3 mt-3">
                                                    <label
                                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="nowpassword"
                                                    >
                                                        Mật khẩu hiện tại:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                        placeholder="********"
                                                        required
                                                        name="nowpassword"
                                                        onChange={handleChangePass}
                                                    />
                                                </div>
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="newpassword"
                                                    >
                                                        Mật khẩu mới:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                        placeholder="********"
                                                        required
                                                        name="newpassword"
                                                        onChange={handleChangePass}
                                                    />
                                                </div>
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="newpasswordAgain"
                                                    >
                                                        Nhập lại mật khẩu mới:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                        placeholder="********"
                                                        required
                                                        name="newpasswordAgain"
                                                        onChange={handleChangePass}
                                                    />
                                                </div>
                                                <div className="message">
                                                    <p className="text-center text-danger">{error}</p>
                                                </div>
                                                <button type="button" className="btn btn-warning flex-end" onClick={handleEditPassSubmit} >Submit</button>
                                            </div>
                                        </div >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default memo(CardSettings);
