import React, { useRef } from "react";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "styles/testimonials.scss";
import item1Img from "../../images/home/testimonials/item-1.png";
import item2Img from "../../images/home/testimonials/item-2.png";
import item3Img from "../../images/home/testimonials/item-3.png";

import arrowLeftImg from "../../images/home/testimonials/arrow-left.png";
import arrowRightImg from "../../images/home/testimonials/arrow-right.png";

const Testimonials = () => {
    const swiperRef = useRef();

    const items = [
        {
            image: item1Img,
            name: "John Fang",
            url: "wordfaang.com",
            desc: "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.",
        },
        {
            image: item2Img,
            name: "Jane Doe",
            url: "janedoee.com",
            desc: "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.",
        },
        {
            image: item3Img,
            name: "Jim Ferry",
            url: "jimjimf.com",
            desc: "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.",
        },
    ];

    return (
        <div className="testimonial">
            <div className="testimonial-wrapper">
                <p className="title">Testimonials</p>
                <Swiper
                    pagination={{
                        clickable: true,
                    }}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    modules={[Pagination, Navigation]}
                    className="swiper"
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={index} className="swiper-slide">
                            <div className="swiper-item">
                                <img src={item.image} />
                                <div className="swiper-text">
                                    <p className="swiper-title">{item.name}</p>
                                    <p className="swiper-link">{item.url}</p>
                                    <p className="swiper-desc">{item.desc}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="arrow">
                        <div
                            className="arrow-left"
                            onClick={() => swiperRef.current?.slidePrev()}
                        >
                            <img src={arrowLeftImg} />
                        </div>
                        <div
                            className="arrow-right"
                            onClick={() => swiperRef.current?.slideNext()}
                        >
                            <img src={arrowRightImg} />
                        </div>
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;
