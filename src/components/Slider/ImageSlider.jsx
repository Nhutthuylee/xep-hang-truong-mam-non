import React, { useRef} from 'react';
import Slider from 'react-slick';

const ImageSlider = (props) => {
    const {data}= props;
    console.log("ben chi tiet", data)
    const ref = useRef({});

    const next = () => {
        ref.current.slickNext();
    };

    const previous = () => {
        ref.current.slickPrev();
    };

    function images(listImage){
        var result = [];
        for (const i in listImage) {
            result.push(listImage[i]['image'])   
        }
        var imgs= result.map((i)=>{
            return <div key ={i}><img src={i} alt="" className="img-fluid rounded shadow-sm" style={{width:"400px", height:"300px"}} /></div>
        })
        return imgs;
    }
  
    var settings = {
        className: "center",
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 2000,
      };

  return (
           <Slider ref={ref} {...settings}>
             {images(data)}
            </Slider>
  );
};

export default ImageSlider;