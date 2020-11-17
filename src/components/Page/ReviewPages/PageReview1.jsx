import React from 'react';
import ReactStars from "react-rating-stars-component";
import ItemForm from './ItemForm';
const PageReview1 = ({formData, setForm, navigation }) => {
    const {firstName,tc2,tc3, tc4, tc5}= formData;
    const logo = require('../../../img/logo-web-2.PNG');
    const { next } = navigation;
    const ratingChanged = (newRating) => {
        console.log(newRating);
        var m= newRating.toString();
        setForm(m)
      };
    return (
        <div className="form">
            <img
                src= {logo}
                alt="img"
                className="imageCover"
            />
            <ItemForm label="Name" name="firstName" value={firstName} onChange={setForm} />
            {/* <div className="row">
            <label className="col-md-4">tiêu chí 1:</label>
            <ReactStars
                className="col-md-8"
                count={5}
                name="tc1"
                value={tc1}
                onChange={setForm}
                size={40}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
            </div> */}
            
            <div className="row">
            <label className="col-md-4">tiêu chí 2:</label>
            <ReactStars
                className="col-md-8"
                count={5}
                name="firstName"
                value={tc2}
                onChange={setForm}
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
                name="tc3"
                value={tc3}
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
                name="tc4"
                value={tc4}
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
                name="tc5"
                value={tc5}
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
                <button onClick={next}>Next</button>
            </div>
        </div>
    );
};

export default PageReview1;