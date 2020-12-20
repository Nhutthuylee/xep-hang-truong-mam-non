import Axios from "axios";
import React from "react";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { adminService } from '../../../services/AdminService';
import CardTableSchool from "../../Cards/CardTableSchool.jsx";
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import history from '../../../history';
import { Input } from 'reactstrap';
const TableSchool = () => {

    const [customer, setCustomer] = useState([]);
    const [total, setTotal] = useState(1);
    const [index, setindex] = useState(1);
    const [image, setimage] = useState(null)
    const [message, setMesssage] = useState("")
    const listTypeSchool = ["Công lập", "Tư thục", "Nhóm nhà trẻ"]
    const listWard = ["Hòa Minh", "Hòa Khánh Nam", "Hòa Khánh Bắc", "Hòa Hiệp Nam", "Hòa Hiệp Bắc"]
    const [newSchool, setNewSchool] = useState({
        SchoolName: '',
        Address: '',
        PhoneNumber: '',
        AcceptChildren: '',
        Tuition: '0 đ - 0 đ',
        Ward: '',
        SchoolType: '',
        Introduce: '',
        InfrastructureIntroduce: '',
        MethodsOfEducationIntroduce: '',
        TeachersIntroduce: '',
        NutritionIntroduce: '',
        haveBreadfastService: false,
        haveLateReceptionService: false,
        haveBusService: false,
        haveSaturdayService: false,
        haveSwimmingPool: false,
        haveIndoorPlayground: false,
        haveOutdoorPlayground: false,
        haveLibrary: false,
        haveMonitoringCamera: false
    });
    function handleChange(e) {
        const { name, value } = e.target;
        setNewSchool(newSchool => ({ ...newSchool, [name]: value }))
        setMesssage("")
    }

    const [showCreate, setShowCreate] = useState(false);

    const handleClose = () => setShowCreate(false);
    const handleShow = () => setShowCreate(true);

    const handleError = (errorMsg) => {
        setMesssage(errorMsg)
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("taji submit", newSchool);
        const { SchoolName,
            Address,
            PhoneNumber,
            AcceptChildren,
            Tuition,
            Ward,
            SchoolType,
            Introduce,
            InfrastructureIntroduce,
            MethodsOfEducationIntroduce,
            TeachersIntroduce,
            NutritionIntroduce,
            haveBreadfastService,
            haveLateReceptionService,
            haveBusService,
            haveSaturdayService,
            haveSwimmingPool,
            haveIndoorPlayground,
            haveOutdoorPlayground,
            haveLibrary,
            haveMonitoringCamera } = newSchool;

        let reSchoolname = new RegExp("^[a-zA-Z][a-zA-Z0-9]{1,255}");
        let reAddress = new RegExp("^[0-9][a-zA-Z0-9]{1,255}");
        let rePhoneNum = new RegExp("^[0-9]{9,255}");
        if (!reSchoolname.test(SchoolName)) {
            handleError("Tên trường chưa hợp lệ, vui lòng nhập lại")
        } else if (!reAddress.test(Address)) {
            handleError("Địa chỉ chưa hợp lệ")
        } else if (!rePhoneNum.test(PhoneNumber)) {
            handleError("Định dạng số điện thoại chưa hợp lệ. Nên bắt đầu bằng chữ số")
        } else if (image === null) {
            handleError("Hãy thêm ảnh logo cho trường")
        } else {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("schoolName", SchoolName)
            formData.append("phoneNumber", PhoneNumber)
            formData.append("address", Address)
            formData.append("tuition", Tuition)
            formData.append("ward", Ward)
            formData.append("schoolType", SchoolType)
            formData.append("acceptChildren", AcceptChildren)
            formData.append("introduce", Introduce)
            formData.append("infrastructureIntroduce", InfrastructureIntroduce)
            formData.append("methodOfEducationIntroduce", MethodsOfEducationIntroduce)
            formData.append("teachersIntroduce", TeachersIntroduce)
            formData.append("nutritionIntroduce", NutritionIntroduce)
            formData.append("haveBreadfastService", haveBreadfastService)
            formData.append("haveLateReceptionService", haveLateReceptionService)
            formData.append("haveBusService", haveBusService)
            formData.append("haveSaturdayService", haveSaturdayService)
            formData.append("haveSwimmingPool", haveSwimmingPool)
            formData.append("haveIndoorPlayground", haveIndoorPlayground)
            formData.append("haveOutdoorPlayground", haveOutdoorPlayground)
            formData.append("haveLibrary", haveLibrary)
            formData.append("haveMonitoringCamera", haveMonitoringCamera)
            Axios({
                method: 'POST',
                url: "http://localhost:8080/api/admin/createSchool",
                headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                },
                data: formData
            }).then(
                response => {
                    refetchData()
                    toast.success("Bạn đã tạo thành công một trường mầm non")
                }
            )
        }


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
                "acceptChildren": listCustomer[i].acceptChildren,
                "introduce": listCustomer[i].introduce,
                "methodsOfEducationIntroduce": listCustomer[i].methodsOfEducationIntroduce,
                "infrastructureIntroduce": listCustomer[i].infrastructureIntroduce,
                "teachersIntroduce": listCustomer[i].teachersIntroduce,
                "nutritionIntroduce": listCustomer[i].nutritionIntroduce,
                "haveSwimmingPool": listCustomer[i].haveSwimmingPool,
                "haveOutdoorPlayground": listCustomer[i].haveOutdoorPlayground,
                "haveIndoorPlayground": listCustomer[i].haveIndoorPlayground,
                "haveLibrary": listCustomer[i].haveLibrary,
                "haveMonitoringCamera": listCustomer[i].haveMonitoringCamera,
                "haveBreadfastService": listCustomer[i].haveBreadfastService,
                "haveLateReceptionService": listCustomer[i].haveLateReceptionService,
                "haveBusService": listCustomer[i].haveBusService,
                "haveSaturdayService": listCustomer[i].haveSaturdayService
            }
            // console.log("l", l)
            result.push(l)
        }
        return result
    }
    const getListSchoolfunc = useCallback((index) => {
        let next = index.toString()
        // console.log("dmm", next)
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

                    <Button variant="primary" onClick={handleShow}>
                        Tạo trường mới
                    </Button>

                    <Modal show={showCreate} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Tạo trường mầm non mới</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form name="form" >
                                <div className="form-group">
                                    <label >Tên trường: <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" className="form-control" name="SchoolName" onChange={handleChange} />

                                </div>
                                <div className="form-group">
                                    <label >Địa chỉ <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" className="form-control" name="Address" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label >Số điện thoại <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" className="form-control" name="PhoneNumber" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label >Loại hình trường: <span style={{ color: "red" }}>*</span></label>
                                    {/* <input type="text" className="form-control" name="SchoolType" onChange={handleChange} /> */}
                                    <Input type="select" id="SchoolType"
                                        value={newSchool.SchoolType}
                                        onChange={e => setNewSchool({
                                            ...newSchool, SchoolType: e.target.value
                                        })}
                                    >
                                        <option />
                                        {listTypeSchool.map((type, i) => (
                                            <option key={type} value={i + 1}>{type}</option>
                                        ))}

                                    </Input>

                                </div>
                                <div className="form-group">
                                    <label >Thuộc phường: <span style={{ color: "red" }}>*</span></label>
                                    {/* <input type="text" className="form-control" name="Ward" onChange={handleChange} /> */}
                                    <Input type="select" id="Ward"
                                        value={newSchool.Ward}
                                        onChange={e => setNewSchool({
                                            ...newSchool, Ward: e.target.value
                                        })}
                                    >
                                        <option />
                                        {listWard.map((ward, i) => (
                                            <option key={ward} value={i + 1}>{ward}</option>
                                        ))}

                                    </Input>
                                </div>
                                <div className="form-group">
                                    <label >Nhận trẻ tuổi từ: <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" className="form-control" name="AcceptedChildren" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label >Học phí: </label>
                                    <input type="text" className="form-control" name="Tuition" defaultValue="0đ - 0đ" value={newSchool.Tuition} onChange={handleChange} />
                                </div>
                                <p className=" mb-3 font-bold text-xs px-4 py-2 rounded shadow outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" data-toggle="collapse" data-target="#changePass" aria-expanded="false" aria-controls="changePass">Các dịch vụ</p>
                                <div className="collapse" id="changePass">
                                    <div>
                                        <div className="relative w-full mb-3 mt-3">
                                            <div className="form-check">
                                                <input type="checkbox" onChange={e => {
                                                    setNewSchool({
                                                        ...newSchool, haveBreadfastService: !newSchool.haveBreadfastService
                                                    })
                                                    console.log("iputs", newSchool)
                                                }
                                                }
                                                    checked={newSchool.haveBreadfastService}
                                                    className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" htmlFor="exampleCheck1">Ăn sáng</label>
                                            </div>
                                        </div>
                                        <div className="relative w-full mb-3 mt-3">
                                            <div className="form-check">
                                                <input type="checkbox" onChange={e =>
                                                    setNewSchool({
                                                        ...newSchool, haveLateReceptionService: !newSchool.haveLateReceptionService
                                                    })

                                                }
                                                    checked={newSchool.haveLateReceptionService}
                                                    className="form-check-input" id="exampleCheck2" />
                                                <label className="form-check-label" htmlFor="exampleCheck2">Đón muộn</label>
                                            </div>
                                        </div>
                                        <div className="relative w-full mb-3 mt-3">
                                            <div className="form-check">
                                                <input type="checkbox" onChange={e =>
                                                    setNewSchool({
                                                        ...newSchool, haveSaturdayService: !newSchool.haveSaturdayService
                                                    })

                                                }
                                                    checked={newSchool.haveSaturdayService}
                                                    className="form-check-input" id="exampleCheck3" />
                                                <label className="form-check-label" htmlFor="exampleCheck3">Trông thứ 7</label>
                                            </div>
                                        </div>
                                        <div className="relative w-full mb-3 mt-3">
                                            <div className="form-check">
                                                <input type="checkbox"
                                                    onChange={e =>
                                                        setNewSchool({
                                                            ...newSchool, haveBusService: !newSchool.haveBusService
                                                        })

                                                    }
                                                    checked={newSchool.haveBusService}
                                                    className="form-check-input" id="exampleCheck4" />
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
                                                <input type="checkbox" onChange={e =>
                                                    setNewSchool({
                                                        ...newSchool, haveSwimmingPool: !newSchool.haveSwimmingPool
                                                    })

                                                }
                                                    checked={newSchool.haveSwimmingPool}
                                                    className="form-check-input" id="exampleCheck5" />
                                                <label className="form-check-label" htmlFor="exampleCheck5">Hồ bơi</label>
                                            </div>
                                        </div>
                                        <div className="relative w-full mb-3 mt-3">
                                            <div className="form-check">
                                                <input type="checkbox" onChange={e =>
                                                    setNewSchool({
                                                        ...newSchool, haveIndoorPlayground: !newSchool.haveIndoorPlayground
                                                    })

                                                }
                                                    checked={newSchool.haveIndoorPlayground}
                                                    className="form-check-input" id="exampleCheck6" />
                                                <label className="form-check-label" htmlFor="exampleCheck6">Sân chơi trong nhà</label>
                                            </div>
                                        </div>
                                        <div className="relative w-full mb-3 mt-3">
                                            <div className="form-check">
                                                <input type="checkbox" onChange={e =>
                                                    setNewSchool({
                                                        ...newSchool, haveOutdoorPlayground: !newSchool.haveOutdoorPlayground
                                                    })

                                                }
                                                    checked={newSchool.haveOutdoorPlayground}
                                                    className="form-check-input" id="exampleCheck7" />
                                                <label className="form-check-label" htmlFor="exampleCheck7">Sân chân ngoài trời</label>
                                            </div>
                                        </div>
                                        <div className="relative w-full mb-3 mt-3">
                                            <div className="form-check">
                                                <input type="checkbox" onChange={e =>
                                                    setNewSchool({
                                                        ...newSchool, haveLibrary: !newSchool.haveLibrary
                                                    })

                                                }
                                                    checked={newSchool.haveLibrary}
                                                    className="form-check-input" id="exampleCheck8" />
                                                <label className="form-check-label" htmlFor="exampleCheck8">Thư viện</label>
                                            </div>
                                        </div>
                                        <div className="relative w-full mb-3 mt-3">
                                            <div className="form-check">
                                                <input type="checkbox" onChange={e =>
                                                    setNewSchool({
                                                        ...newSchool, haveMonitoringCamera: !newSchool.haveMonitoringCamera
                                                    })

                                                }
                                                    checked={newSchool.haveMonitoringCamera}
                                                    className="form-check-input" id="exampleCheck9" />
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
                                            <textarea type="text" className="form-control" name="InfrastructureIntroduce" onChange={handleChange} />

                                        </div>
                                        <div className="form-group">
                                            <label >Về phương pháp giảng dạy: </label>
                                            <textarea type="text" className="form-control" name="MethodsOfEducationIntroduce" onChange={handleChange} />

                                        </div>
                                        <div className="form-group">
                                            <label >Về đội ngũ nhân sự: </label>
                                            <textarea type="text" className="form-control" name="TeachersIntroduce" onChange={handleChange} />
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

                                <div className="message">

                                    <p className="text-center text-danger">{message}</p>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>
                                Send
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="w-full mb-12 px-4">
                    <CardTableSchool columns={column} data={customer} totalPage={total} refetchData={refetchData} />
                    <div>
                        <button
                            type="button"
                            style={{ marginRight: "5px" }}
                            className="btn btn-secondary"
                            onClick={() => setindex(1)}
                            disabled={index === 1 ?? 'undefined'}
                        >&laquo;</button>
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
                            style={{ marginRight: "5px" }}
                            onClick={() => setindex(index + 1)}
                            disabled={index === total ?? 'undefined'}
                        >Next</button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setindex(total)}
                            disabled={index === total ?? 'undefined'}
                        >&raquo;</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default TableSchool;
