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
            console.log("id school",schoolid.id)
            history.push("/admin/comment/"+schoolid.id+"/"+ schoolid.schoolName)
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
                Cell: ({row}) => (
                    <div>
                        <button className="btn btn-warning" onClick={()=>handleManagerComment(row.original)}> Đến quản lý comment</button>
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
                                    <h5 className="modal-title" id="creatSchoolModalTitle">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form name="form" >
                                        <div className="form-group">
                                            <label >User Name <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" name="UserName" onChange={handleChange} />

                                        </div>
                                        <div className="form-group">
                                            <label >Email <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" name="Email" onChange={handleChange} />

                                        </div>
                                        <div className="form-group">
                                            <label >Password <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" name="Password" onChange={handleChange} />

                                        </div>
                                        <div className="form-group">
                                            <label >Address <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control" name="Address" onChange={handleChange} />
                                        </div>
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
