// ReviewSlide.jsx

import {SwiperSlide} from "swiper/react";
import dayjs from "dayjs";
import {forwardRef} from "react";

const ReviewSlide = forwardRef(function ReviewSlide({e, index}, ref) {
            return (
                <SwiperSlide itemRef={ref} className="slider-rewievs__slide slide-rewievs swiper-slide">
                    <div className="slide-rewievs__top">
                        <div className="slide-rewievs__ico"><img src="@img/rewievs/01.png" alt=""/></div>
                        <div className="slide-rewievs__info">
                            <div className="slide-rewievs__name">{e.telegramId} {index}</div>
                            <div className="slide-rewievs__place">БЛОГЕР</div>
                        </div>
                    </div>
                    <div className="slide-rewievs__text">{e.text}</div>
                    <div className="slide-rewievs__date">{dayjs(e.date).format('DD.MM.YYYY HH:mm')}</div>
                </SwiperSlide>
            );
        }
    )
;

export default ReviewSlide;