import React from "react";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { adminService } from '../../../services/AdminService';
import CardTable from "../../Cards/CardTable.jsx";
import { toast } from 'react-toastify';
import Axios from "axios";

const Tables = () => {

    const [customer, setCustomer] = useState([]);
    const [total, setTotal] = useState(1);
    const [index, setindex] = useState(1);
    const [image, setimage] = useState()
    const [message, setMesssage] = useState("")
    const [newUser, setNewUser] = useState({
        UserName: '',
        Email: '',
        Password: '',
        Address: '',
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setNewUser(newUser => ({ ...newUser, [name]: value }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const column = useMemo(
        () => [
            {
                Header: () => null,
                id: 'expander', // 'id' is required
                Cell: ({ row }) => (
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? '👇' : '👉'}
                    </span>
                ),
            },
            { Header: "User ID", accessor: 'id', disableFilters: true, },
            { Header: "User Name", accessor: 'name' },
            { Header: "Email", accessor: 'email' },
            { Header: "Address", accessor: 'address' },
            { Header: "Avatar", accessor: 'avatar', disableFilters: true, },
            // { Header: "Role Name", accessor: 'role' },
            // {
            //     Header: 'Action',
            //     accessor: "role",
            //     Cell: row => (
            //         <div>
            //             <button style={{ marginRight: "5px" }}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</button>
            //             <button onClick={()=>}> <i className="fa fa-trash-o" aria-hidden="true"></i>Delete</button>
            //         </div>
            //     )
            // }
        ]);


    const handleError = (errorMsg) => {
        setMesssage(errorMsg)
    }
    function pushDataFromAPIData(listCustomer) {
        return listCustomer.map((i) => {
            return {
                "id": i.id,
                "name": i.name,
                "email": i.email,
                "address": i.address,
                "avatar": i.avatar
            }
        })
    }
    const getListCustomerfunc = useCallback((index) => {
        let next = index.toString()
        console.log("T vua moi lay trang ", next)
        adminService.getListCustomer(next).then(
            ([content, pages]) => {
                const data = content;
                // console.log("data", data)
                setCustomer(pushDataFromAPIData(data));
                var gettotal = pages;
                setTotal(gettotal);
            }
        )
    }, [])
    useEffect(() => {

        getListCustomerfunc(1)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { UserName, Email, Password, Address } = newUser
        let reUsername = new RegExp("^[a-zA-Z][a-zA-Z0-9]{1,255}");
        let reEmail = new RegExp("^[a-zA-Z][a-zA-Z0-9]{1,255}");
        let reAddress = new RegExp("^[a-zA-Z][a-zA-Z0-9]{1,255}");
        let rePassword = new RegExp("^[a-zA-Z][a-zA-Z0-9]{4,255}");
        if (!reUsername.test(UserName)) {
            handleError("Tên người dùng chưa hợp lệ, vui lòng nhập lại")
        } else if (!reEmail.test(Email)) {
            handleError("Email người dùng không hợp lệ, vui lòng nhập lại")
        } else if (!rePassword.test(Password)) {
            handleError("Mật khẩu có trên 4 kí tự. Hãy nhập lại")
        } else if (!reAddress.test(Address)) {
            handleError("Vui lòng nhập vào địa chỉ")
        }
        else if (UserName && Email && Password && Address) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("email", Email)
            formData.append("password", Password)
            formData.append("address", Address)
            formData.append("username", UserName)
            Axios({
                method: 'POST',
                url: "http://localhost:8080/api/admin/create",
                headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                },
                data: formData
            }).then(
                response => {
                    const msg = response.data.message;
                    if (msg === "Create successfully") {
                        refetchData()
                        toast.success("Tạo thành công")
                    } else {
                        handleError(msg)
                    }

                }
            )
        }

    }

    useEffect(() => {
        getListCustomerfunc(index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])

    const refetchData = useCallback(() => getListCustomerfunc(index), [getListCustomerfunc, index])

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4" style={{ placeSelf: "flex-end" }}>
                    <button type="button" data-toggle="modal" className="btn btn-info mr-3 mt-3" data-target="#exampleModalLong" >Tạo người dùng mới</button>
                    <div className="modal fade" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Thêm người dùng</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form name="form" onSubmit={handleSubmit}>
                                        <div>
                                            <label >User Name <span style={{ color: "red" }}>*</span></label>
                                            <input type="text"
                                                className={"form-control"}
                                                placeholder="Nhập vào tên người dùng"
                                                required
                                                name="UserName"
                                                onChange={handleChange}
                                            />

                                        </div>
                                        <div>
                                            <label >Email <span style={{ color: "red" }}>*</span></label>
                                            <input type="email" aria-describedby="emailHelp" className="form-control" required name="Email" onChange={handleChange} />

                                        </div>
                                        <div >
                                            <label >Password <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" required name="Password" onChange={handleChange} />

                                        </div>
                                        <div >
                                            <label >Address <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" required name="Address" onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label >Image</label>
                                            <input type="file" className="form-control" name="Image" required onChange={(e) => setimage(e.target.files[0])} />

                                        </div>
                                        <div className="message">

                                            <p className="text-center text-danger">{message}</p>
                                        </div>
                                        <div className="mt-3" style={{ textAlign: "end" }}>
                                            <button type="button" className="btn btn-secondary mr-2" data-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary">Send</button>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mb-12 px-4">
                    <CardTable columns={column} data={customer} totalPage={total} refetchData={refetchData} />
                    <div>
                        <button
                            type="button"
                            style={{ marginRight: "5px" }}
                            className="btn btn-secondary"
                            onClick={() => setindex(index - 1)}
                            disabled={index === 1 ?? 'undefined'}
                        >Pre</button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setindex(index + 1)}
                            disabled={index === total ?? 'undefined'}
                        >Next</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Tables;
