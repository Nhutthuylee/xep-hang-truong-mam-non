import Axios from 'axios';
import React, { useState } from 'react';
import Rating from 'react-rating';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import history from '../../../history';
const PageReview1 = () => {
    let { schoolid } = useParams();
    const id = localStorage.getItem('id');
    const logo = require('../../../img/logo-web-2.PNG');
    const [tchi1, setTchi1] = useState(0);
    const [tchi2, setTchi2] = useState(0);
    const [tchi3, setTchi3] = useState(0);
    const [tchi4, setTchi4] = useState(0);
    const [tchi5, setTchi5] = useState(0);
    const [tchi6, setTchi6] = useState(0);
    const [tchi7, setTchi7] = useState(0);
    const [tchi8, setTchi8] = useState(0);
    const [tchi9, setTchi9] = useState(0);
    const [tchi10, setTchi10] = useState(0);
    const [tchi11, setTchi11] = useState(0);
    const [tchi12, setTchi12] = useState(0);
    const [tchi13, setTchi13] = useState(0);
    const [tchi14, setTchi14] = useState(0);
    const [tchi15, setTchi15] = useState(0);
    const handleSend = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Xác nhận gửi đánh giá",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy"
        }).then(result => {
            Axios({
                method: "POST",
                url: "http://localhost:8080/createReview",
                headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                },
                data: {
                    "userId": id,
                    "schoolId": schoolid,
                    "diem_danh_gia_csvc": tchi1,
                    "diem_dam_bao_so_luong_hoc_vien_mot_lop_hoc": tchi2,
                    "diem_dam_bao_so_luong_giao_vien_mot_lop_hoc": tchi3,
                    "diem_dich_vu_y_te": tchi4,
                    "diem_che_do_dinh_duong_va_bep_an": tchi5,
                    "diem_chuong_trinh_hoc": tchi6,
                    "diem_to_chuc_va_chat_luong_hoat_dong_ngoai_khoa": tchi7,
                    "diem_dam_bao_an_ninh_trat_tu": tchi8,
                    "diem_dam_bao_an_toan_cho_be": tchi9,
                    "diem_dam_bao_giai_dap_van_de_tu_phu_huynh": tchi10,
                    "diem_quan_he_giao_vien_nha_truong_voi_phu_huynh": tchi11,
                    "diem_thai_do_giao_vien_ngoai_lop_hoc": tchi12,
                    "diem_thai_do_giao_vien_trong_lop_hoc": tchi13,
                    "diem_dam_bao_ve_sinh_ca_nhan_cho_be": tchi14,
                    "diem_muc_do_muon_den_truong_cua_be": tchi15
                }
            }).then(
                res => {
                    history.goBack()
                }
            )

        })

    }
    return (
        <div className="form mt-5" style={{ maxWidth: "840px" }}>
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={logo}
                        alt="img"
                        className="imageCover"
                        style={{ width: "350px" }}
                    />
                </div>
                <div className="col-md-8">
                    <h2 className="mt-3" style={{ fontSize: "30px" }}>Phiếu đánh giá:</h2>
                </div>
            </div>

            <div className="row">
                <label className="col-md-12">Tiêu chí 1 - Về Cơ sở vật chất của nhà trường, mức độ hài lòng của bạn về cơ sở vật chất: <span style={{ color: "red", fontWeight: "400", fontSize: "25px" }}>*</span></label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi1}
                    initialRating={tchi1}
                />
            </div>

            <div className="row">
                <label className="col-md-12">Tiêu chí 2 - Trường có đảm bảo số lượng học viên trong một lớp hay không? Nếu không rõ bạn có thể bỏ qua:</label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi2}
                    initialRating={tchi2}
                />
            </div>

            <div className="row">
                <label className="col-md-12">Tiêu chí 3 -  Trường có đảm bảo số lượng giáo viên trong một lớp hay không? <span style={{ color: "red", fontWeight: "400", fontSize: "25px" }}>*</span></label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi3}
                    initialRating={tchi3}
                />
            </div>
            <div className="row">
                <label className="col-md-12">Tiêu chí 4 - Mức độ hài lòng về dịch vụ y tế của trường: <span style={{ color: "red", fontWeight: "400", fontSize: "25px" }}>*</span></label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi4}
                    initialRating={tchi4}
                />
            </div>
            <div className="row">
                <label className="col-md-12">Tiêu chí 5- Mức độ hài lòng về chế độ dinh dưỡng và vệ sinh bếp ăn: <span style={{ color: "red", fontWeight: "400", fontSize: "25px" }}>*</span></label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi5}
                    initialRating={tchi5}
                />
            </div>
            <div className="row">
                <label className="col-md-12">Tiêu chí 6 - Đánh giá về chương trình học <span style={{ color: "red", fontWeight: "400", fontSize: "25px" }}>*</span></label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi6}
                    initialRating={tchi6}
                />
            </div>

            <div className="row">
                <label className="col-md-12">tiêu chí 7 - Mức độ hài lòng về việc tổ chức và chất lượng các buổi ngoại khóa trường tổ chức: </label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi7}
                    initialRating={tchi7}
                />
            </div>

            <div className="row">
                <label className="col-md-12">Tiêu chí 8 - Đánh giá về an ninh, trật tự của trường: </label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi8}
                    initialRating={tchi8}
                />
            </div>
            <div className="row">
                <label className="col-md-12">Tiêu chí 9 - Mức độ hài lòng về bảo vệ an toàn cho bé tại trường:</label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi9}
                    initialRating={tchi9}
                />
            </div>
            <div className="row">
                <label className="col-md-12">tiêu chí 10 - Nhà trường thường xuyên giải đáp kịp thời các vấn đề, ý kiến từ phụ huynh: <span style={{ color: "red", fontWeight: "400", fontSize: "25px" }}>*</span></label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi10}
                    initialRating={tchi10}
                />
            </div>
            <div className="row">
                <label className="col-md-12">Tiêu chí 11 - Quan hệ giữa giáo viên, nhà trường và phụ huynh:</label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi11}
                    initialRating={tchi11}
                />
            </div>

            <div className="row">
                <label className="col-md-12">Tiêu chí 12 - Giáo viên ngoài giờ học thường xuyên liên hệ các vấn đề cấp thiết về bé:</label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi12}
                    initialRating={tchi12}
                />
            </div>

            <div className="row">
                <label className="col-md-12">Tiêu chí 13 - Giáo viên trong giờ luôn tích cực giảng dạy, chú ý đến bé: </label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi13}
                    initialRating={tchi13}
                />
            </div>
            <div className="row">
                <label className="col-md-12">Tiêu chí 14 - Đảm bảo vệ sinh cá nhân cho bé</label>
                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi14}
                    initialRating={tchi14}
                />
            </div>
            <div className="row">
                <label className="col-md-12">Tiêu chí 15 - Mức độ bé yêu trường và muốn đến trường học: <span style={{ color: "red", fontWeight: "400", fontSize: "25px" }}>*</span></label>

                <Rating
                    className="col-md-12"
                    placeholderRating={0}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    onClick={setTchi15}
                    initialRating={tchi15}
                />
            </div>
            <div className="row" style={{ justifyContent: "flex-end" }}>
                <button type="submit" className="btn btn-send" style={{ backgroundColor: "#4caf4f", width: "15%" }} onClick={handleSend}> Send</button>
            </div>
        </div>
    );
};

export default PageReview1;