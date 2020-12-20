import React, { memo, useState } from 'react';
import { CardImg, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Button, Modal } from 'react-bootstrap';
import { adminService } from '../../services/AdminService';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

const CardDetailUser = (props) => {
    const { data } = props;
    const [inputs, setInputs] = useState(data);
    const [message, setMesssage] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleChange(e) {
        const { name, value } = e.target;
        let newInputs = { ...inputs };
        newInputs[name] = value;
        setInputs(newInputs);
    }
    function handleDelete(id) {

        Swal.fire({
            title: "Bạn đang thực hiện xóa",
            text: "Bạn muốn xóa người dùng này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy"
        })
            .then(result => {
                if (result.isConfirmed) {
                    adminService.deleteCustomer(id)
                        .then(res => {
                            props.refetchData()
                            toast.success("Xóa thành công")
                        })
                }
            })
    }
    const handleError = (errorMsg) => {
        setMesssage(errorMsg)
    }
    function handleUpdate() {
        if (inputs === data) {
            handleError("Bạn chưa thay đổi thông tin nào")
        } else {
            let reUsername = new RegExp("^[a-zA-Z][a-zA-Z0-9]{1,255}");
            if (!reUsername.test(inputs.name)) {
                handleError("Tên người dùng không hợp lệ vui lòng nhập lại")
            } else if (inputs.address === "") {
                handleError("Vui lòng nhập địa chỉ người dùng")
            } else {
                Swal.fire({
                    title: "Bạn đang thực hiện Cập nhật thông tin người dùng",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Xác nhận",
                    cancelButtonText: "Hủy"
                })
                    .then(result => {
                        if (result.isConfirmed) {
                            adminService.updateCustomerInfo(inputs.id, inputs.name, inputs.email, inputs.address)
                                .then(
                                    res => {
                                        props.refetchData()
                                        handleClose();
                                        toast.success("Cập nhật thông tin người dùng thành công")
                                    }
                                )
                        }
                    })
            }

        }

    }
    return (
        <>
            <div className="row">

                <Col sm={3}>
                    <CardImg top style={{ width: "300px" }} src={data.avatar} alt="Card image cap"></CardImg>
                </Col>
                <Col sm={9}>
                    <Form >
                        <FormGroup row>
                            <Label for="exampleUsername" sm={3} size="lg">User Name</Label>
                            <Col sm={9}>
                                <Input type="text"
                                    name="name"
                                    id="exampleUsername"
                                    placeholder="lg"
                                    bsSize="lg"
                                    disabled
                                    value={inputs.name}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail2" sm={3}>Email</Label>
                            <Col sm={9}>
                                <Input type="email" name="email" id="exampleEmail2" placeholder="default" defaultValue={inputs.email} disabled />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleAddress" sm={3}>Address</Label>
                            <Col sm={9}>
                                <Input type="text" name="address" id="exampleAddress" disabled placeholder="default" value={inputs.address} />
                            </Col>
                        </FormGroup>

                    </Form>

                    <Button variant="info" onClick={handleShow}>
                        Edit
                                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Chỉnh sửa thông tin người dùng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form name="form">
                                <div className="form-group">
                                    <label >User Name <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" className="form-control" name="name" required value={inputs.name} onChange={handleChange} />

                                </div>
                                <div className="form-group">
                                    <label >Email <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" className="form-control" name="email" value={inputs.email} disabled />

                                </div>
                                <div className="form-group">
                                    <label >Address <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" className="form-control" required value={inputs.address} name="address" onChange={handleChange} />
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
                            <Button variant="primary" onClick={handleUpdate}>
                                Send
                                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </div>

            <div>

                <Button variant="danger" onClick={() => handleDelete(data.id)}> <i className="fa fa-trash-o" aria-hidden="true"></i>Delete</Button>
            </div>

        </>
    );
};



export default memo(CardDetailUser);