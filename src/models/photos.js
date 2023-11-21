import React, { useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Photo = () => {
  const photos = [
    'https://www.kongu.ac.in/images/header2021.png',
    'url_to_image_2',
    'url_to_image_3',
    // Add more image URLs as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {photos.map((photo, index) => (
        <div style={{width:'100%' , height:'100%' , display:'block'}} key={index}>
          <img src={photo} alt={`Hostel Photo ${index + 1}`} />
        </div>
      ))}
    </Slider>
  )
};


export default Photo