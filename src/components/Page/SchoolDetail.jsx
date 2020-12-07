/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react';
import '../../styles/SchoolDetail.css';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { userService } from '../../services/UserService';
import Nav from '../Navbars/Nav';
import AuthNav from '../Navbars/AuthNav';
import Footer from '../Footer';
import Swal from 'sweetalert2';
import history from '../../history';
import ImageSlider from '../Slider/ImageSlider';
import Comments from '../Cards/Comments';
import Axios from 'axios';
const SchoolDetail = (props) => {
    const [Sdata, setSdata] = useState({});
    const [schoolid, setschoolId] = useState(0);
    const [checkReview, setReview] = useState("");
    let { name } = useParams();
    const userId = localStorage.getItem('id');
    function pushDataFromAPIData(info) {

        let array = [];
        Object.keys(info).forEach(i => array[i] = info[i]);

        return array;
    }
    const checkReviewedByUserid = useCallback((id, schoolid) => {
        Axios({
            method: "POST",
            url: "http://localhost:8080/checkReviewed",
            data: {
                userId: id,
                schoolId: schoolid
            }
        }).then(
            res => {
                const status = res.data.status;
                setReview(status)
                // if (status === 'FAILED') {
                //     return <button type="button" className="btn btn-outline-success" onClick={handleClick}>Đánh giá</button>
                // } else if (status === 'SUCCESS') {
                //     return <button type="button" className="btn btn-success" disabled>Đánh giá</button>
                // }
            }  
        )
    }, [])
    const getDetailInfofunc = useCallback((name) => {
        userService.getSchoolDetailInfo(name).then(
            (data) => {

                // setComtdata(data.listComment)
                setSdata(pushDataFromAPIData(data));
                setschoolId(data.id)
                // console.log("id", data.id)
                checkReviewedByUserid(userId, data.id)

            }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        getDetailInfofunc(name)


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    function handleClick() {
        if (!localStorage.getItem('token')) {
            Swal.fire({
                title: "Bạn chưa đăng nhập",
                text: "Vui lòng đăng nhập để thực hiện hành động",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Đến đăng nhập",
                cancelButtonText: "Hủy"
            })
                .then(result => {
                    if (result.isConfirmed) {
                        history.push("/login")
                    }
                })
        } else {
            history.push('/auth/review/' + schoolid)
        }
    }

    return (
        <div>
            {!localStorage.getItem("token") && <Nav></Nav>}
            {localStorage.getItem("token") && <AuthNav></AuthNav>}
            <div className="row" style={{ backgroundColor: "#edf5ea" }}>
                <div className="col-md-8 mx-auto">
                    {/* Profile widget */}
                    <div className="bg-white shadow rounded overflow-hidden">
                        <div className="px-4 pt-4 pb-4 cover">
                            <div className="media align-items-end profile-head">
                                <div className="profile mr-3"><img src={Sdata.avatar} alt="..." width={200} className="rounded mb-2 img-thumbnail" /></div>
                                <div className="media-body mb-5 text-gray">
                                    <h2 className="mt-0 mb-0">{Sdata.name}</h2>
                                    <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2" />{Sdata.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light p-4 d-flex justify-content-end text-center">
                            <ul className="list-inline mb-0">
                                {!localStorage.getItem("token") && <button type="button" className="btn btn-outline-success" onClick={handleClick}>Đánh giá</button>}
                                {checkReview === "FAILED" && <button type="button" className="btn btn-outline-success" onClick={handleClick}>Đánh giá</button>}
                                {checkReview === "SUCCESS" && <button type="button" className="btn btn-success" disabled>Đánh giá</button>}

                            </ul>
                        </div>
                        <div className="py-4 px-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="mb-0">Hình ảnh của trường</h5>
                            </div>
                            <div className="row">
                                {/* {images(Sdata.listImage)} */}
                            </div>
                            <div style={{ textAlign: "-webkit-center" }}>
                                <ImageSlider data={Sdata.listImage} />
                            </div>
                        </div>
                        <div className="px-4 py-3">
                            <h5 className="mb-0">Tổng quan</h5>
                            <div className="p-4 rounded shadow-sm bg-light">
                                <p className="font-italic mb-0">{Sdata.introduce}</p><br />
                                <p className="font-italic mb-0">{Sdata.infrastructureIntroduce}</p><br />
                                <p className="font-italic mb-0">{Sdata.methodsOfEducationIntroduce}</p><br />
                                <p className="font-italic mb-0">{Sdata.nutritionIntroduce}</p><br />
                                <p className="font-italic mb-0">{Sdata.teachersIntroduce}</p>
                            </div>
                        </div>
                        <div className="px-4 py-3">
                            <h5 className="mb-0">Chi tiết</h5>
                            <div className="p-4 rounded shadow-sm bg-light">
                                <div className="row">
                                    <ul className="col-md-6">
                                        <li className="font-italic mb-0"><strong>Loại hình trường: </strong>{Sdata.schoolType}</li>
                                        <li className="font-italic mb-0"><strong>Nhận bé từ: </strong>{Sdata.acceptChildrenAge}</li>
                                        <li className="font-italic mb-0"><strong>Học phí: </strong>{Sdata.tuition}</li>
                                    </ul>
                                    <ul className="col-md-6">
                                        <li className="font-italic mb-0"><strong>Địa chỉ: </strong>{Sdata.address}</li>
                                        <li className="font-italic mb-0"><strong>Số điện thoại: </strong>{Sdata.phoneNumber}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3">
                            <h5 className="mb-0">Cơ sở vật chất</h5>
                            <div className="p-4 rounded shadow-sm bg-light row">
                                {Sdata.haveIndoorPlayground && <div style={{ marginRight: "20px" }}><i className="fas fa-paw fa-4x "></i>
                                    <p style={{ width: "100px" }}>Sân chơi trong nhà</p></div>}
                                {Sdata.haveSwimmingPool && <div style={{ marginRight: "20px" }}><i className="fas fa-swimming-pool fa-4x"></i>
                                    <p style={{ width: "100px" }}>Bể bơi</p></div>}
                                {Sdata.haveOutdoorPlayground && <div style={{ marginRight: "20px" }}><i className="fas fa-futbol fa-4x"></i>
                                    <p style={{ width: "100px" }}>Sân chơi ngoài trời</p></div>}
                                {Sdata.haveLibrary && <div style={{ marginRight: "20px" }}><i className="fa fa-4x fa-book"></i>
                                    <p style={{ width: "100px" }}>Thư viện</p></div>}
                                {Sdata.haveMonitoringCamera && <div style={{ marginRight: "20px" }}><i className="fas fa-video fa-4x"></i>
                                    <p style={{ width: "100px" }}>Xem camera trực tuyến</p></div>}
                            </div>
                        </div>
                        <div className="px-4 py-3">
                            <h5 className="mb-0">Dịch vụ</h5>
                            <div className="p-4 rounded shadow-sm bg-light row">
                                {Sdata.haveBreadfastService && <div style={{ marginRight: "20px" }}><i className="fa fa-4x fa-cutlery"></i>
                                    <p style={{ width: "100px" }}>Ăn sáng</p></div>}
                                {Sdata.haveBusService && <div style={{ marginRight: "20px" }}><i className="fa fa-bus"></i>
                                    <p style={{ width: "100px" }}>Xe đưa đón</p></div>}
                                {Sdata.haveLateReceptionService && <div style={{ marginRight: "20px" }}><i className="far fa-clock fa-4x"></i>
                                    <p style={{ width: "100px" }}>Đón muộn</p></div>}
                                {Sdata.haveSaturdayService && <div style={{ marginRight: "20px" }}><i className="fa fa-calendar fa-4x"></i>
                                    <p style={{ width: "100px" }}>Trông thứ 7</p></div>}
                            </div>
                        </div>
                        <div className="px-4 py-3">
                            <h5>Comment</h5>
                            {schoolid !== 0 && <Comments schoolId={schoolid} />}
                        </div>

                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default SchoolDetail;