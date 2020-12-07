import React, { useState } from 'react';
import { Button, CardImg, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import Axios from 'axios';
const CardDetailSchool = (props) => {
    const { data } = props;
    const [inputs, setInputs] = useState(data);
    const [image, setimage] = useState();
    function handleChange(e) {
        const { name, value } = e.target;
        let newInputs = { ...inputs };
        newInputs[name] = value;
        setInputs(newInputs);
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

                }
            })
    }
    function selectedValueShow(seleted_status) {
        if (seleted_status === "Công lập") {
            return <>
                <option selected defaultValue="1">Công lập</option>
                <option defaultValue="2">Tư thục</option>
                <option defaultValue="3">Nhóm nhà trẻ</option>
            </>
        } else if (seleted_status === "Tư thục") {
            return <>
                <option defaultValue="1">Công lập</option>
                <option selected defaultValue="2">Tư thục</option>
                <option defaultValue="3">Nhóm nhà trẻ</option>
            </>
        } else if (seleted_status === "Nhóm nhà trẻ") {
            return <>
                <option defaultValue="1">Công lập</option>
                <option defaultValue="2">Tư thục</option>
                <option selected defaultValue="3">Nhóm nhà trẻ</option>
            </>
        }
    }
    function wardValueShow(selected_status) {
        if (selected_status === "Hòa Minh") {
            return <>
                <option selected defaultValue="1">Hòa Minh</option>
                <option defaultValue="2">Hòa Khánh Nam</option>
                <option defaultValue="3">Hòa Khánh Bắc</option>
                <option defaultValue="4">Hòa Hiệp Nam</option>
                <option defaultValue="5">Hòa Hiệp Bắc</option>
            </>
        } else if (selected_status === "Hòa Khánh Nam") {
            return <>
                <option defaultValue="1">Hòa Minh</option>
                <option selected defaultValue="2">Hòa Khánh Nam</option>
                <option defaultValue="3">Hòa Khánh Bắc</option>
                <option defaultValue="4">Hòa Hiệp Nam</option>
                <option defaultValue="5">Hòa Hiệp Bắc</option>
            </>
        } else if (selected_status === "Hòa Khánh Bắc") {
            return <>
                <option defaultValue="1">Hòa Minh</option>
                <option defaultValue="2">Hòa Khánh Nam</option>
                <option selected defaultValue="3">Hòa Khánh Bắc</option>
                <option defaultValue="4">Hòa Hiệp Nam</option>
                <option defaultValue="5">Hòa Hiệp Bắc</option>
            </>
        } else if (selected_status === "Hòa Hiệp Nam") {
            return <>
                <option defaultValue="1">Hòa Minh</option>
                <option defaultValue="2">Hòa Khánh Nam</option>
                <option defaultValue="3">Hòa Khánh Bắc</option>
                <option selected defaultValue="4">Hòa Hiệp Nam</option>
                <option defaultValue="5">Hòa Hiệp Bắc</option>
            </>
        } else if (selected_status === "Hòa Hiệp Bắc") {
            return <>
                <option defaultValue="1">Hòa Minh</option>
                <option defaultValue="2">Hòa Khánh Nam</option>
                <option defaultValue="3">Hòa Khánh Bắc</option>
                <option defaultValue="4">Hòa Hiệp Nam</option>
                <option selected defaultValue="5">Hòa Hiệp Bắc</option>
            </>
        }
    }
    function handleUpdateImage(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", image);
        Axios({
            method: "POST",
            url: "http://localhost:8080/api/admin/updateUserImage",
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json',
            },
            data: formData
        }).then(
            res => {
                props.refetchData();
                toast.success("Update hình ảnh thành công")
            }
        )
    }
    return (
        <>

            <div className="row">
                <Col sm={3}>
                    <CardImg top style={{ width: "300px" }} src={inputs.image} alt="Card image cap"></CardImg>

                    <button type="button" data-toggle="modal" className="ml-3 mt-3 mb-3" data-target="#modalUpdateImage" >Thêm hình cho trường <i className="fas fa-camera"></i></button>
                    <div className="modal fade" id="modalUpdateImage" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="modalUpdateImageTitle">Cập nhật hình ảnh</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form name="form" >
                                        <div className="form-group">
                                            <label >Hình ảnh</label>
                                            <input type="file" className="form-control" name="Image" onChange={(e) => setimage(e.target.files[0])} />
                                        </div>


                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleUpdateImage}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                >
                                    {selectedValueShow(inputs.schoolType)}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleWard" sm={3}>Thuộc quận: </Label>
                            <Col sm={9}>
                                <Input type="select"
                                    name="ward"
                                    id="exampleWard"
                                    placeholder="lg"
                                    onChange={handleChange}
                                >
                                    {wardValueShow(inputs.ward)}
                                </Input>
                            </Col>
                        </FormGroup>
                        <Button> <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</Button>
                    </Form>
                </Col>
                <Button onClick={() => handleDelete(data.id)}> <i className="fa fa-trash-o" aria-hidden="true"></i>Delete</Button>
            </div>
        </>
    );
};

export default CardDetailSchool;