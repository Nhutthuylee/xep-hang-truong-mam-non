import React, { useState } from 'react';
import { CardImg, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import Axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
const CardDetailSchool = (props) => {
    const { data } = props;
    const [inputs, setInputs] = useState(data);
    const [image, setimage] = useState(null);
    const [img, setImg] = useState(null);
    const [show, setShow] = useState(false);
    const [showAddImage, setShowAddImage] = useState(false);
    const [showTab2, setShowTab2] = useState(false);
    const [message, setMesssage] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowTab2 = () => setShowTab2(true);
    const handleCloseTab2 = () => setShowTab2(false);
    const handleShowAddImage = () => setShowAddImage(true);
    const handleCloseAddImage = () => setShowAddImage(false);

    const listTypeSchool = ["Công lập", "Tư thục", "Nhóm nhà trẻ"]
    const listWard = ["Hòa Minh", "Hòa Khánh Nam", "Hòa Khánh Bắc", "Hòa Hiệp Nam", "Hòa Hiệp Bắc"]

    function handleChange(e) {
        const { name, value } = e.target;
        let newInputs = { ...inputs };
        newInputs[name] = value;
        setInputs(newInputs);
        // setMesssage("")
    }
    function handleUpdateAvatar(e) {
        if (image === null) {
            setMesssage("Vui lòng chọn hình")
        } else {
            const formUpdateAvatar = new FormData();
            formUpdateAvatar.append("id", data.id);
            formUpdateAvatar.append("file", image);
            Swal.fire({
                title: "Xác nhận cập nhật thay đổi hình ảnh logo ",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Xác nhận",
                cancelButtonText: "Hủy"
            })
                .then(result => {
                    if (result.isConfirmed) {
                        Axios({
                            method: 'PUT',
                            url: "http://localhost:8080/api/admin/updateSchoolAvatar",
                            headers: {
                                "Authorization": 'Bearer ' + localStorage.getItem("token"),
                                'Content-Type': 'application/json',
                            },
                            data: formUpdateAvatar
                        }).then(
                            res => {
                                props.refetchData()
                                toast.success("Bạn vừa câp nhật logo thành công")
                            }
                        )
                    }
                })
        }
    }
    const handleError = (errorMsg) => {
        setMesssage(errorMsg)
    }
    function handleUpdate(e) {
        if (inputs === data) {
            handleError("Bạn chưa thay đổi thông tin nào")
        } else {
            let reSchoolname = new RegExp("^[a-zA-Z][a-zA-Z0-9]{1,255}");
            let reAddress = new RegExp("^[0-9][a-zA-Z0-9]{1,255}");
            let rePhoneNum = new RegExp("^[0-9]{1,255}");
            if (!reSchoolname.test(inputs['schoolName'])) {
                handleError("Tên trường chưa hợp lệ, vui lòng nhập lại")
            } else if (!reAddress.test(inputs.address)) {
                handleError("Địa chỉ chưa hợp lệ")
            } else if (!rePhoneNum.test(inputs.phoneNumber)) {
                handleError("Định dạng số điện thoại chưa hợp lệ. Nên bắt đầu bằng chữ số")
            } else if (inputs.tuition === "") {
                setInputs({
                    ...inputs, tuition: "0 đ - 0 đ"
                })
            } else {
                const formData = new FormData();
                formData.append("id", data.id);
                formData.append("schoolName", inputs.schoolName)
                formData.append("phoneNumber", inputs.phoneNumber)
                formData.append("address", inputs.address)
                formData.append("tuition", inputs.tuition)
                formData.append("ward", inputs.ward)
                formData.append("schoolType", inputs.schoolType)
                formData.append("acceptChildren", inputs.acceptChildren)
                formData.append("introduce", inputs.introduce)
                formData.append("infrastructureIntroduce", inputs.infrastructureIntroduce)
                formData.append("methodOfEducationIntroduce", inputs.methodsOfEducationIntroduce)
                formData.append("teachersIntroduce", inputs.teachersIntroduce)
                formData.append("nutritionIntroduce", inputs.nutritionIntroduce)
                formData.append("haveBreadfastService", inputs.haveBreadfastService)
                formData.append("haveLateReceptionService", inputs.haveLateReceptionService)
                formData.append("haveBusService", inputs.haveBusService)
                formData.append("haveSaturdayService", inputs.haveSaturdayService)
                formData.append("haveSwimmingPool", inputs.haveSwimmingPool)
                formData.append("haveIndoorPlayground", inputs.haveIndoorPlayground)
                formData.append("haveOutdoorPlayground", inputs.haveOutdoorPlayground)
                formData.append("haveLibrary", inputs.haveLibrary)
                formData.append("haveMonitoringCamera", inputs.haveMonitoringCamera)
                Swal.fire({
                    title: "Xác nhận cập nhật thay đổi",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: "Xác nhận",
                    cancelButtonText: "Hủy"
                })
                    .then(result => {
                        if (result.isConfirmed) {
                            Axios({
                                method: 'PUT',
                                url: "http://localhost:8080/api/admin/updateSchool",
                                headers: {
                                    "Authorization": 'Bearer ' + localStorage.getItem("token"),
                                    'Content-Type': 'application/json',
                                },
                                data: formData
                            }).then(
                                res => {
                                    props.refetchData()
                                    toast.success("Bạn vừa câp nhật thông tin cho trường thành công")
                                }
                            )
                        }
                    })
            }

        }

    }
    function handleDelete(id) {
        Swal.fire({
            title: "Bạn đang thực hiện hành động xóa một trường",
            text: "Bạn thật sự muốn xóa",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy"
        })
            .then(result => {
                if (result.isConfirmed) {
                    Axios({
                        method: 'DELETE',
                        url: "http://localhost:8080/api/admin/deleteSchool",
                        headers: {
                            "Authorization": 'Bearer ' + localStorage.getItem("token"),
                            'Content-Type': 'application/json',
                        },
                        data: {
                            "id": id
                        }
                    }).then(
                        res => {
                            if (res.data.status === 'FAILE') {
                                toast.success("Xóa thất bại")
                            } else {
                                props.refetchData()
                                toast.success("Xóa thành công")
                            }
                        }
                    )
                }
            })
    }
    function handleUpdateImage(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", img);
        formData.append("id", data.id);
        Swal.fire({
            title: "Xác nhận cập nhật thay đổi hình ảnh logo ",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy"
        }).then(
            result => {
                if (result.isConfirmed) {
                    Axios({
                        method: "POST",
                        url: "http://localhost:8080/api/admin/addImageForSchool",
                        headers: {
                            "Authorization": 'Bearer ' + localStorage.getItem("token"),
                            'Content-Type': 'application/json',
                        },
                        data: formData
                    }).then(
                        res => {
                            props.refetchData();
                            toast.success("Bạn vừa thêm một hình ảnh thành công cho trường " + inputs.schoolName);
                        }
                    )
                }
            }
        )

    }
    return (
        <>
            <div className="row">
                <Col sm={3}>
                    <CardImg top style={{ width: "300px" }} src={inputs.image} alt="Card image cap"></CardImg>
                    <Button variant="link" onClick={handleShowAddImage}>
                        Thêm hình cho trường
                    </Button>
                    <Modal show={showAddImage} onHide={handleCloseAddImage}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thay đổi logo trường</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group mt-3">
                                <input type="file" className="form-control" name="Img" onChange={(e) => setImg(e.target.files[0])} />
                            </div>
                            <div className="message">

                                <p className="text-center text-danger">{message}</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAddImage}>
                                Close
                                                </Button>
                            <Button variant="primary" onClick={handleUpdateImage}>
                                Send
                                                </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
                <Col sm={9}>
                    <strong>{inputs.schoolName}</strong>
                    <Form>
                        <FormGroup row>
                            <Label for="exampleAddress" sm={3}>Địa chỉ:</Label>
                            <Col sm={9}>
                                <Input type="text"
                                    name="address"
                                    id="exampleAddress"
                                    placeholder="lg"
                                    value={inputs.address}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="examplePhonenumber" sm={3}>Số điện thoại: </Label>
                            <Col sm={9}>
                                <Input type="text"
                                    name="phonenumber"
                                    id="examplePhonenumber"
                                    placeholder="lg"
                                    value={inputs.phoneNumber}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleTuition" sm={3}>Học phí: </Label>
                            <Col sm={9}>
                                <Input type="text"
                                    name="tuition"
                                    id="exampleTuition"
                                    placeholder="lg"
                                    value={inputs.tuition}
                                    readOnly
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleSchoolType" sm={3}>Loại hình trường: </Label>
                            <Col sm={9}>
                                <Input type="select"
                                    name="schoolType"
                                    id="exampleSchoolType"
                                    placeholder="lg"
                                    readOnly
                                >
                                    {listTypeSchool.map((type, i) => {
                                        if ((i + 1) === inputs.schoolType) {
                                            return <option key={type} selected value={i + 1}>{type}</option>
                                        } else {
                                            return <option key={type} value={i + 1}>{type}</option>
                                        }
                                    })}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleWard" sm={3}>Thuộc phường: </Label>
                            <Col sm={9}>
                                <Input type="select"
                                    name="ward"
                                    id="exampleWard"
                                    placeholder="lg"
                                    readOnly
                                >
                                    {listWard.map((ward, i) => {
                                        if ((i + 1) === inputs.ward) {
                                            return <option key={ward} selected value={i + 1}>{ward}</option>
                                        } else {
                                            return <option key={ward} value={i + 1}>{ward}</option>
                                        }
                                    })}
                                </Input>
                            </Col>
                        </FormGroup>
                        <Button variant="info" onClick={handleShow}>
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                                    </Button>

                        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                            <Modal.Header closeButton >
                                <Modal.Title id="example-modal-sizes-title-lg" >Chỉnh sửa thông tin trường</Modal.Title>
                            </Modal.Header>
                            <Modal.Body >

                                <div>
                                    <div className="form-group">
                                        <label >Tên trường: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" value={inputs.schoolName} className="form-control" name="schoolName" onChange={handleChange} />

                                    </div>
                                    <div className="form-group">
                                        <label >Địa chỉ <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" value={inputs.address} className="form-control" name="address" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label >Số điện thoại: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" className="form-control" name="phoneNumber" value={inputs.phoneNumber} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label >Loại hình trường: <span style={{ color: "red" }}>*</span></label>
                                        <Input type="select"
                                            name="schoolType"
                                            id="exampleSchoolType"
                                            placeholder="lg"
                                            onChange={e => setInputs({
                                                ...inputs, schoolType: e.target.value
                                            })}
                                        >
                                            {listTypeSchool.map((type, i) => {
                                                if (type === inputs.schoolType) {
                                                    setInputs({
                                                        ...inputs, schoolType: i + 1
                                                    })
                                                    return <option key={type} selected value={i + 1}>{type}</option>
                                                } else {
                                                    return <option key={type} value={i + 1}>{type}</option>
                                                }
                                            })}

                                        </Input>

                                    </div>
                                    <div className="form-group">
                                        <label >Thuộc phường: <span style={{ color: "red" }}>*</span></label>
                                        <Input type="select"
                                            name="ward"
                                            id="exampleWard"
                                            placeholder="lg"
                                            onChange={e => setInputs({
                                                ...inputs, ward: e.target.value
                                            })}
                                        >
                                            {listWard.map((ward, i) => {
                                                if (ward === inputs.ward) {
                                                    setInputs({
                                                        ...inputs, ward: i + 1
                                                    })
                                                    return <option key={ward} selected value={i + 1}>{ward}</option>
                                                } else {
                                                    return <option key={ward} value={i + 1}>{ward}</option>
                                                }
                                            })}
                                        </Input>

                                    </div>
                                    <div className="form-group">
                                        <label >Nhận trẻ tuổi từ: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" value={inputs.acceptChildren} className="form-control" name="acceptChildren" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label >Học phí: <span style={{ color: "red" }}>*</span></label>
                                        <input type="text" className="form-control" name="tuition" value={inputs.tuition} onChange={handleChange} />
                                    </div>
                                    <p className=" mb-3 font-bold text-xs px-4 py-2 rounded shadow outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" data-toggle="collapse" data-target="#changePass" aria-expanded="false" aria-controls="changePass">Các dịch vụ</p>
                                    <div className="collapse" id="changePass">
                                        <div>
                                            <div className="relative w-full mb-3 mt-3">
                                                <div className="form-check">
                                                    <input type="checkbox" onChange={e => {
                                                        setInputs({
                                                            ...inputs, haveBreadfastService: !inputs.haveBreadfastService
                                                        })
                                                        console.log("iputs", inputs)
                                                    }
                                                    }
                                                        checked={inputs.haveBreadfastService}
                                                        className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Ăn sáng</label>
                                                </div>
                                            </div>
                                            <div className="relative w-full mb-3 mt-3">
                                                <div className="form-check">
                                                    <input type="checkbox" onChange={e => {
                                                        setInputs({
                                                            ...inputs, haveLateReceptionService: !inputs.haveLateReceptionService
                                                        })
                                                    }
                                                    }
                                                        checked={inputs.haveLateReceptionService}
                                                        className="form-check-input" id="exampleCheck2" />
                                                    <label className="form-check-label" htmlFor="exampleCheck2">Đón muộn</label>
                                                </div>
                                            </div>
                                            <div className="relative w-full mb-3 mt-3">
                                                <div className="form-check">
                                                    <input type="checkbox" onChange={e => {
                                                        setInputs({
                                                            ...inputs, haveSaturdayService: !inputs.haveSaturdayService
                                                        })
                                                    }
                                                    }
                                                        checked={inputs.haveSaturdayService}
                                                        className="form-check-input" id="exampleCheck3" />
                                                    <label className="form-check-label" htmlFor="exampleCheck3">Trông thứ 7</label>
                                                </div>
                                            </div>
                                            <div className="relative w-full mb-3 mt-3">
                                                <div className="form-check">
                                                    <input type="checkbox" onChange={e => {
                                                        setInputs({
                                                            ...inputs, haveBusService: !inputs.haveBusService
                                                        })
                                                    }
                                                    }
                                                        checked={inputs.haveBusService}
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
                                                    <input type="checkbox" onChange={e => {
                                                        setInputs({
                                                            ...inputs, haveSwimmingPool: !inputs.haveSwimmingPool
                                                        })
                                                    }
                                                    }
                                                        checked={inputs.haveSwimmingPool}
                                                        className="form-check-input" id="exampleCheck5" />
                                                    <label className="form-check-label" htmlFor="exampleCheck5">Hồ bơi</label>
                                                </div>
                                            </div>
                                            <div className="relative w-full mb-3 mt-3">
                                                <div className="form-check">
                                                    <input type="checkbox" onChange={e => {
                                                        setInputs({
                                                            ...inputs, haveIndoorPlayground: !inputs.haveIndoorPlayground
                                                        })
                                                    }
                                                    }
                                                        checked={inputs.haveIndoorPlayground}
                                                        className="form-check-input" id="exampleCheck6" />
                                                    <label className="form-check-label" htmlFor="exampleCheck6">Sân chơi trong nhà</label>
                                                </div>
                                            </div>
                                            <div className="relative w-full mb-3 mt-3">
                                                <div className="form-check">
                                                    <input type="checkbox" onChange={e => {
                                                        setInputs({
                                                            ...inputs, haveOutdoorPlayground: !inputs.haveOutdoorPlayground
                                                        })
                                                    }
                                                    }
                                                        checked={inputs.haveOutdoorPlayground}
                                                        className="form-check-input" id="exampleCheck7" />
                                                    <label className="form-check-label" htmlFor="exampleCheck7">Sân chân ngoài trời</label>
                                                </div>
                                            </div>
                                            <div className="relative w-full mb-3 mt-3">
                                                <div className="form-check">
                                                    <input type="checkbox" onChange={e => {
                                                        setInputs({
                                                            ...inputs, haveLibrary: !inputs.haveLibrary
                                                        })
                                                    }
                                                    }
                                                        checked={inputs.haveLibrary}
                                                        className="form-check-input" id="exampleCheck8" />
                                                    <label className="form-check-label" htmlFor="exampleCheck8">Thư viện</label>
                                                </div>
                                            </div>
                                            <div className="relative w-full mb-3 mt-3">
                                                <div className="form-check">
                                                    <input type="checkbox" onChange={e => {
                                                        setInputs({
                                                            ...inputs, haveMonitoringCamera: !inputs.haveMonitoringCamera
                                                        })
                                                    }
                                                    }
                                                        checked={inputs.haveMonitoringCamera}
                                                        className="form-check-input" id="exampleCheck9" />
                                                    <label className="form-check-label" htmlFor="exampleCheck9">Camera trực tiếp</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div >

                                    <p className="mt-3 font-bold text-xs px-4 py-2 rounded shadow outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" data-toggle="collapse" data-target="#gioithieu" aria-expanded="false" aria-controls="gioithieu">Giới thiệu về trường</p>
                                    <div className="collapse" id="gioithieu">
                                        <div>
                                            <div className="form-group mt-3">
                                                <label >Tổng quan <span style={{ color: "red" }}>*</span></label>
                                                <textarea type="text" className="form-control" value={inputs.introduce} name="introduce" onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label >Về cơ sở vật chất</label>
                                                <textarea type="text" className="form-control" value={inputs.infrastructureIntroduce} name="infrastructureIntroduce" onChange={handleChange} />

                                            </div>
                                            <div className="form-group">
                                                <label >Về phương pháp giảng dạy: </label>
                                                <textarea type="text" className="form-control" value={inputs.methodsOfEducationIntroduce} name="methodsOfEducationIntroduce" onChange={handleChange} />

                                            </div>
                                            <div className="form-group">
                                                <label >Về đội ngũ nhân sự: </label>
                                                <textarea type="text" className="form-control" value={inputs.teachersIntroduce} name="teachersIntroduce" onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label >Về chế độ dinh dưỡng: </label>
                                                <textarea type="text" className="form-control" value={inputs.nutritionIntroduce} name="nutritionIntroduce" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div >

                                    <div className="form-group mt-3">
                                        <label >Hình ảnh</label>
                                        <CardImg style={{ width: "50%", height: "50%" }} src={inputs.image} alt="Card image cap"></CardImg>
                                        <Button style={{ marginTop: "5px" }} variant="info" onClick={handleShowTab2}>Thay đổi logo</Button>
                                        <Modal show={showTab2} onHide={handleCloseTab2}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Thay đổi logo trường</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <form>
                                                    <div className="form-group mt-3">
                                                        <CardImg src={inputs.image} alt="Card image cap"></CardImg>
                                                        <input type="file" className="form-control" name="Image" onChange={(e) => setimage(e.target.files[0])} />
                                                    </div>
                                                    <div className="message">

                                                        <p className="text-center text-danger">{message}</p>
                                                    </div>
                                                </form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseTab2}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleUpdateAvatar}>
                                                    Send
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        <div className="message">

                                            <p className="text-center text-danger">{message}</p>
                                        </div>

                                    </div>


                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                        </Button>
                                <Button variant="primary" onClick={handleUpdate}>
                                    Send
                                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </Form>
                </Col>
                <Button variant="danger" onClick={() => handleDelete(data.id)} style={{ marginLeft: "15px" }}> <i className="fa fa-trash-o" aria-hidden="true"></i>Delete</Button>
            </div>
        </>
    );
};

export default CardDetailSchool;