import React from 'react';
import ReactStars from 'react-rating-stars-component';
// import history from '../../../history';

const PageReview3 = ({ formData, setForm, navigation }) => {
    const {tc11,tc12,tc13,tc14,tc15 }= formData;
    const { previous, next } = navigation;
    return (
        <div className="form">
            <div className="row">
            <label className="col-md-4">tiêu chí 1:</label>
            <ReactStars
                className="col-md-8"
                count={5}
                name="tc11"
                value={tc11}
                onClick={setForm}
                size={40}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
            </div>
            
            <div className="row">
            <label className="col-md-4">tiêu chí 2:</label>
            <ReactStars
                className="col-md-8"
                count={5}
                name="tc12"
                value={tc12}
                onClick={setForm}
                size={40}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
            </div>
            <div className="row">
            <label className="col-md-4">tiêu chí 3:</label>
            <ReactStars
                className="col-md-8"
                count={5}
                name="tc13"
                value={tc13}
                onClick={setForm}
                size={40}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
            </div>
            <div className="row">
            <label className="col-md-4">tiêu chí 4:</label>
            <ReactStars
                className="col-md-8"
                count={5}
                name="tc14"
                value={tc14}
                onClick={setForm}
                size={40}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
            </div>
            <div className="row">
            <label className="col-md-4">tiêu chí 5:</label>
            <ReactStars
                className="col-md-8"
                count={5}
                name="tc15"
                value={tc15}
                onClick={setForm}
                size={40}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
            </div>
            <div>
                <button onClick={previous}>Previous</button>
                <button onClick={next}>next</button>
            </div>
        </div>
    );
};

export default PageReview3;