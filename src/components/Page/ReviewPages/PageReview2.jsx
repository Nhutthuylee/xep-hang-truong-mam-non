import React from 'react';
import ReactStars from 'react-rating-stars-component';
const PageReview2 = ({ formData,setForm, navigation }) => {
    const {tc6,tc7,tc8,tc9,tc10 }= formData;
    const { previous, next } = navigation
    return (
        <div className="form">
            <div className="row">
            <label className="col-md-4">tiêu chí 1:</label>
            <ReactStars
                className="col-md-8"
                count={5}
                name="tc6"
                value={tc6}
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
                name="tc7"
                value={tc7}
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
                name="tc8"
                value={tc8}
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
                name="tc9"
                value={tc9}
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
                name="tc10"
                value={tc10}
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
                <button onClick={next}>Next</button>
            </div>
        </div>
    );
};

export default PageReview2;