import React, {useState} from 'react';
import { Button, CardImg, Col, Form, FormGroup, Label, Input } from 'reactstrap';
// import { toast } from "react-toastify";
import Swal from 'sweetalert2';
const CardDetailSchool = (props) => {
    const {data}= props;
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
                
            }
        })
    }
    return (
        <>

                <div className="row">
                    <Col sm={3}>
                        <CardImg top style={{ width: "300px" }} src={inputs.image} alt="Card image cap"></CardImg>
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
                                    <Input type="text"
                                        name="schoolType"
                                        id="exampleSchoolType"
                                        placeholder="lg"
                                        value={inputs.schoolType}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleWard" sm={3}>Thuộc quận: </Label>
                                <Col sm={9}>
                                    <Input type="text"
                                        name="ward"
                                        id="exampleWard"
                                        placeholder="lg"
                                        value={inputs.ward}
                                        onChange={handleChange}
                                    />
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