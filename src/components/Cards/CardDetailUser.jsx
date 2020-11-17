import React, { memo, useState } from 'react';
import { Button, CardImg, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { adminService } from '../../services/AdminService';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
const CardDetailUser = (props) => {
    const { data } = props;
    const [inputs, setInputs] = useState(data);
    function handleChange(e) {
        const { name, value } = e.target;
        let newInputs = { ...inputs };
        newInputs[name] = value;
        setInputs(newInputs);
    }
    function handleDelete(id) {

        Swal.fire({
            title: "muon xoa thiet ha?",
            text: "thiet hong dzo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "oke toi luon",
            cancelButtonText: "Hủy"
        })
            .then(result => {
                if (result.isConfirmed) {
                    adminService.deleteCustomer(id)
                        .then(res => {
                            props.refetchData()
                            toast.success("Xong roofi nha em yeu")
                        })
                }
            })
    }
    return (
        <>
            <div className="row">

                <Col sm={3}>
                    <CardImg top style={{ width: "300px" }} src={data.avatar} alt="Card image cap"></CardImg>
                </Col>
                <Col sm={9}>
                    <Form>
                        <FormGroup row>
                            <Label for="exampleUsername" sm={3} size="lg">User Name</Label>
                            <Col sm={9}>
                                <Input type="text"
                                    name="name"
                                    id="exampleUsername"
                                    placeholder="lg"
                                    bsSize="lg"
                                    value={inputs.name}
                                    onChange={handleChange} />
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
                                <Input type="text" name="email" id="exampleAddress" placeholder="default" value={inputs.address} onChange={handleChange} />
                            </Col>
                        </FormGroup>
                        <Button> <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</Button>
                    </Form>
                </Col>
            </div>

            <div>

                <Button onClick={() => handleDelete(data.id)}> <i className="fa fa-trash-o" aria-hidden="true"></i>Delete</Button>
            </div>

        </>
    );
};



export default memo(CardDetailUser);