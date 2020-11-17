import React from 'react';
import PropTypes from "prop-types";
// import { } from 'reactstrap';
import { Link } from 'react-router-dom'
export default function CardSchoolInfomation(props) {
    const { data } = props
    const list = data.map((n) =>
        <div key={n.id}>
            <div className="row">
                <div className="col-md-3"><img style={{ width: "250px" }} src={n.image} alt="image_school"></img></div>
                <div className="info col-md-9">
                    <div className="vi_tri">
                        <strong>{n.id}</strong>
                    </div>
                    <div className="row">
                        <Link to={"/detail/" + n.schoolName}><strong className="col-md-12">{n.schoolName}</strong></Link>
                        <div className="col-md-12"><label>Địa chỉ:</label> {n.address} </div>
                        <div className="col-md-12"><label>Sdt:</label>{n.phoneNumber}</div>
                        <div className="col-md-12"><label>Học phí:</label>{n.tuition}</div>

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
CardSchoolInfomation.defaultProps = {
    data: [],
}
CardSchoolInfomation.protoTypes = {
    data: PropTypes.array
}
