import React, { useState, useEffect, useRef } from 'react';
import styles from './Slider.module.css';

const SliderComponent = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    let touchStartX = 0;

    const touchStart = (e) => {
        touchStartX = e.touches[0].clientX;
    };

    const touchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX - touchEndX;

        if (diffX > 100) {
            setCurrentSlide((currentSlide + 1) % slides.length);
        } else if (diffX < -100) {
            setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
        }
    };

    useEffect(() => {
        const sliderElement = sliderRef.current;
        sliderElement.addEventListener('touchstart', touchStart);
        sliderElement.addEventListener('touchend', touchEnd);

        return () => {
            sliderElement.removeEventListener('touchstart', touchStart);
            sliderElement.removeEventListener('touchend', touchEnd);
        };
    }, [currentSlide, slides.length]);

    return (
        <div ref={sliderRef} className={`${styles.hero__wrapper} ${styles.swiperWrapper}`}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <p>{slide.description}</p>
                </div>
            ))}
        </div>
    );
};

export default SliderComponent;
