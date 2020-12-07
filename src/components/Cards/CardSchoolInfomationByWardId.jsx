import React from 'react';
import PropTypes from "prop-types";
// import { } from 'reactstrap';
import { Link } from 'react-router-dom'
export default function CardSchoolInfomationByWardId(props) {
    const { data } = props
    const list = data.map((n,i) =>
        <div key={i}>
            <div className="row">
                <div className="col-md-3"><img style={{ width: "250px" }} src={n.image} alt="image_school"></img></div>
                <div className="info col-md-9">
                    <div className="vi_tri">
                        <strong> {i+1}</strong>
                    </div>
                    <div className="row">
                        <Link to={"/detail/" + n.schoolName}><strong className="col-md-12">{n.schoolName}</strong></Link>
                        <div className="col-md-12 font-italic"><label>Địa chỉ: <span>{n.address}</span></label></div>
                        <div className="col-md-12 font-italic"><label>Sdt: <span>{n.phoneNumber}</span></label></div>
                        <div className="col-md-12 font-italic"><label>Học phí: <span>{n.tuition}</span></label></div>

                    </div>
                </div>

            </div>
            <hr style={{ height: "5px" }} />
        </div>)
    return (
        <>
            {list}
        </>
    );
}
CardSchoolInfomationByWardId.defaultProps = {
    data: [],
}
CardSchoolInfomationByWardId.protoTypes = {
    data: PropTypes.array
}
