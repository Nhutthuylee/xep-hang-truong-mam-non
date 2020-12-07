import React from 'react';
import PropTypes from "prop-types";
// import { } from 'reactstrap';
import { Link } from 'react-router-dom'
export default function CardSchoolInfomation(props) {
    const { data } = props
    const list = data.map((n) =>
        <div key={n.schoolId}>
            <div className="row">
                <div className="col-md-3"><img style={{ width: "250px" }} src={n.image} alt="image_school"></img></div>
                <div className="info col-md-9">
                    <div className="flex flex-wrap mt-6 relative">
                        <div className="w-1/2">
                            <div className="vi_tri">
                                <strong>TOP {n.rank}</strong>
                            </div>
                        </div>
                        <div className="w-1/2 text-right">
                            <div>
                                <p>Điểm <span className="bold" style={{ fontSize: "1em", fontWeight: "800" }}>{n.rate}</span></p>
                            </div>
                        </div>
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
CardSchoolInfomation.defaultProps = {
    data: [],
}
CardSchoolInfomation.protoTypes = {
    data: PropTypes.array
}
