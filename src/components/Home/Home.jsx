import React, { use, useEffect, useState } from 'react'
import styles from './Home.module.css'
import HomeImg1 from '../../assets/Images/onlineShop.jpg'
import slide1 from '../../assets/Images/menCloth.jpeg'
import slide2 from '../../assets/Images/download (1).jpeg'
import slide3 from '../../assets/Images/4bd3cd0a-62cd-4aca-8cd3-9dd55a723ea8.jpeg'
import slide4 from '../../assets/Images//10 ESSENTIAL Accessories For Men _ Spring 2020 List.jpeg'
import slide5 from '../../assets/Images/Headphone.jpeg'
import slide6 from '../../assets/Images/iPhone 16 series.jpeg'
import slide7 from '../../assets/Images/Men-casual-outfitt.jpeg'
import slide8 from '../../assets/Images/download (4).jpeg'
import slide9 from '../../assets/Images/apple.jpeg'
import slide10 from '../../assets/Images/87e5f0bc-2c14-4408-86b2-c84a8e67047c.jpeg'
import slide11 from '../../assets/Images/download (2).jpeg'
import slide12 from '../../assets/Images/Lenovo IdeaPad Slim 5 82SF004XIN Launched in India ( 12th Gen Intel Core i7-1255U _ 16GB ram _ 512GB SSD ) _ Tech Stories India _ Technology News Online.jpeg'
import slide13 from '../../assets/Images/Lenovo Tab Extreme _ Powerful 14_5 inch Android® tablet for your me-time.jpeg'
import slide14 from '../../assets/Images/8ba69b6c-e997-4622-9975-b06dc570b13b.jpeg'
import slide15 from '../../assets/Images/Mode_Style_YS.jpeg'
import slide16 from '../../assets/Images/Serena Pleated Handbag - Brown.jpeg'
// import slide17 from '../../assets/Images/download (3).jpeg'
// import slide18 from '../../assets/Images/download (5).jpeg'
// import slide19 from '../../assets/Images/menCloth.jpeg'
// import slide20 from '../../assets/Images/playstation.jpeg'
import HomeProducts from '../HomeProducts/HomeProducts'
import Slider from "react-slick";


export default function Home() {
    
    function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "block", background: "#1C398E"  }}
        onClick={onClick}
        />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
            className={className}
            style={{ ...style, display: "block", background: "#1C398E"  }}
            onClick={onClick}
            />
        );
    }

    var settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll:2,
    speed: 3000,
    rows: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    slidesPerRow: 2,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        }
        ]
    };
    
    return <>
    <div className=' flex justify-center ' >
        <img src={HomeImg1} className='mt-20' alt="" />
    </div>
    <div className='container max-w-7xl mx-auto mt-10 font-bold '>
        <p className='text-blue-900 text-3xl border border-blue-900 w-fit p-2 rounded-2xl'>Popular Products :</p>
        <Slider {...settings} className='mt-10'>
        <div>
            <img src={slide1} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide2} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide3} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide4} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide5} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide6} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide7} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide8} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide9} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide10} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide11} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide12} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide13} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide14} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide15} className='h-[200px]' alt="" />
        </div>
        <div>
            <img src={slide16} className='h-[200px]' alt="" />
        </div>
        </Slider>
    </div>

    <HomeProducts/>
    </>
}
