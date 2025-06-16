import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function SimpleSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  const images = ["/dining-room-furniture.jpg", "office-furniture.jpg"];
  return (
    <Slider {...settings}>
        {images.map((image, index) => (
            <div key={index}>
              <img src={image} className="w-full h-auto" alt="carousel"/>
            </div>
          ))
        }
    </Slider>
  );
}