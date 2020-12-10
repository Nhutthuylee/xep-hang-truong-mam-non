import Axios from "axios";
import React from "react";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { adminService } from '../../../services/AdminService';
import CardTableSchool from "../../Cards/CardTableSchool.jsx";
import { toast } from 'react-toastify';
import history from '../../../history';
const TableSchool = () => {

    const [customer, setCustomer] = useState([]);
    const [total, setTotal] = useState(1);
    const [index, setindex] = useState(1);
    const [image, setimage] = useState()
    const [newSchool, setNewSchool] = useState({
        SchoolName: '',
        PhoneNumber: '',
        Tuitonn: '',
        Address: '',
        Ward: '',
        SchoolType: '',
    });
    function handleChange(e) {
        const { name, value } = e.target;
        setNewSchool(newSchool => ({ ...newSchool, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", image);
        formData.append("schoolName", newSchool['SchoolName'])
        formData.append("phoneNumber", newSchool['PhoneNumber'])
        formData.append("address", newSchool['Address'])
        formData.append("tuition", newSchool['Tuition'])
        formData.append("ward", newSchool['Ward'])
        formData.append("schoolType", newSchool['SchoolType'])
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
                refetchData()
                toast.success("tao thanh cong")
            }
        )
    }
    function handleManagerComment(schoolid) {
        console.log("id school", schoolid.id)
        history.push("/admin/comment/" + schoolid.id + "/" + schoolid.schoolName)
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
            { Header: "ID", accessor: 'id' },
            { Header: "School Name", accessor: 'schoolName' },
            { Header: "Address", accessor: 'address' },
            // { Header: "Phone Number", accessor: 'phoneNumber' },
            { Header: "Tuition", accessor: 'tuition' },
            {
                Header: 'Action',
                accessor: "role",
                disableFilters: true,
                Cell: ({ row }) => (
                    <div>
                        <button className="btn btn-warning" onClick={() => handleManagerComment(row.original)}> Đến quản lý comment</button>
                    </div>
                )
            }
        ]);


    function pushDataFromAPIData(listCustomer) {
        var result = [];
        for (const i in listCustomer) {
            var l = {
                "id": listCustomer[i].id,
                "schoolName": listCustomer[i].schoolName,
                "address": listCustomer[i].address,
                "phoneNumber": listCustomer[i].phoneNumber,
                "tuition": listCustomer[i].tuition,
                "schoolType": listCustomer[i].schoolType,
                "ward": listCustomer[i].ward,
                "image": listCustomer[i].image,
            }
            // console.log("l", l)
            result.push(l)
        }
        return result
    }
    const getListSchoolfunc = useCallback((index) => {
        let next = index.toString()
        console.log("dmm", next)
        adminService.getListSchool(next).then(
            ([content, pages]) => {
                const data = content;
                setCustomer(pushDataFromAPIData(data));
                var gettotal = pages;
                setTotal(gettotal);
            }
        )
    }, [])
    useEffect(() => {

        getListSchoolfunc(1)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        getListSchoolfunc(index)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])
    const refetchData = useCallback(() => { getListSchoolfunc(index) }, [getListSchoolfunc, index]);

    return (
        <>

            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4" style={{ placeSelf: "flex-end" }}>
                    <button type="button" data-toggle="modal" className="btn btn-info mr-3 mt-3" data-target="#creatSchoolModal" >Tạo một trường học</button>
                    <div className="modal fade" id="creatSchoolModal" tabIndex={-1} role="dialog" aria-labelledby="creatSchoolModalTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="creatSchoolModalTitle">Tạo một trường mới</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form name="form" >
                                        <div className="form-group">
                                            <label >Tên trường: <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" name="UserName" onChange={handleChange} />

                                        </div>
                                        <div className="form-group">
                                            <label >Địa chỉ <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" name="Address" onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label >Loại hình trường: <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" name="SchoolType" onChange={handleChange} />

                                        </div>
                                        <div className="form-group">
                                            <label >Thuộc phường: <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" name="Ward" onChange={handleChange} />

                                        </div>
                                        <div className="form-group">
                                            <label >Nhận trẻ tuổi từ: <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" name="AcceptedChildren" onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label >Học phí: <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" name="Tuition" defaultValue="0đ - 0đ" onChange={handleChange} />
                                        </div>
                                        <p className=" mb-3 font-bold text-xs px-4 py-2 rounded shadow outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" data-toggle="collapse" data-target="#changePass" aria-expanded="false" aria-controls="changePass">Các dịch vụ</p>
                                        <div className="collapse" id="changePass">
                                            <div>
                                                <div className="relative w-full mb-3 mt-3">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                        <label className="form-check-label" htmlFor="exampleCheck1">Ăn sáng</label>
                                                    </div>
                                                </div>
                                                <div className="relative w-full mb-3 mt-3">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                                                        <label className="form-check-label" htmlFor="exampleCheck2">Đón muộn</label>
                                                    </div>
                                                </div>
                                                <div className="relative w-full mb-3 mt-3">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck3" />
                                                        <label className="form-check-label" htmlFor="exampleCheck3">Trông thứ 7</label>
                                                    </div>
                                                </div>
                                                <div className="relative w-full mb-3 mt-3">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck4" />
                                                        <label className="form-check-label" htmlFor="exampleCheck4">Đưa đón bằng xe bus</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div >

                                        <p className="font-bold text-xs px-4 py-2 rounded shadow outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" data-toggle="collapse" data-target="#cosovatchat" aria-expanded="false" aria-controls="cosovatchat">Về cơ sở vật chất</p>
                                        <div className="collapse" id="cosovatchat">
                                            <div>
                                                <div className="relative w-full mb-3 mt-3">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck5" />
                                                        <label className="form-check-label" htmlFor="exampleCheck5">Hồ bơi</label>
                                                    </div>
                                                </div>
                                                <div className="relative w-full mb-3 mt-3">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck6" />
                                                        <label className="form-check-label" htmlFor="exampleCheck6">Sân chơi trong nhà</label>
                                                    </div>
                                                </div>
                                                <div className="relative w-full mb-3 mt-3">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck7" />
                                                        <label className="form-check-label" htmlFor="exampleCheck7">Sân chân ngoài trời</label>
                                                    </div>
                                                </div>
                                                <div className="relative w-full mb-3 mt-3">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck8" />
                                                        <label className="form-check-label" htmlFor="exampleCheck8">Thư viện</label>
                                                    </div>
                                                </div>
                                                <div className="relative w-full mb-3 mt-3">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck9" />
                                                        <label className="form-check-label" htmlFor="exampleCheck9">Camera trực tiếp</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div >

                                        <p className="mt-3 font-bold text-xs px-4 py-2 rounded shadow outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" data-toggle="collapse" data-target="#gioithieu" aria-expanded="false" aria-controls="gioithieu">Giới thiệu về trường</p>
                                        <div className="collapse" id="gioithieu">
                                            <div>
                                                <div className="form-group">
                                                    <label >Tổng quan <span style={{ color: "red" }}>*</span></label>
                                                    <textarea type="text" className="form-control" name="Introduce" onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label >Về cơ sở vật chất</label>
                                                    <textarea type="text" className="form-control" name="IntructionIntroduce" onChange={handleChange} />

                                                </div>
                                                <div className="form-group">
                                                    <label >Về phương pháp giảng dạy: </label>
                                                    <textarea type="text" className="form-control" name="MethodIntroduce" onChange={handleChange} />

                                                </div>
                                                <div className="form-group">
                                                    <label >Về đội ngũ nhân sự: </label>
                                                    <textarea type="text" className="form-control" name="TeacherIntroduce" onChange={handleChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label >Về chế độ dinh dưỡng: </label>
                                                    <textarea type="text" className="form-control" name="NutritionIntroduce" onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div >

                                        <div className="form-group">
                                            <label >image</label>
                                            <input type="file" className="form-control" name="Image" onChange={(e) => setimage(e.target.files[0])} />

                                        </div>


                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mb-12 px-4">
                    <CardTableSchool columns={column} data={customer} totalPage={total} refetchData={refetchData} />
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
export default TableSchool;
