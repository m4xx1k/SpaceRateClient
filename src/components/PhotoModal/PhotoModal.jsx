import React, {useEffect, useRef, useState} from 'react';
import {Carousel} from 'react-responsive-carousel';
import styles from './PhotoModal.module.css';
import {toWebp} from "../../utils.js";

const VITE__API = import.meta.env.VITE__API

const PhotoModal = ({photos, initialIndex, onClose, type='places'}) => {
    const [slide, setSlide] = useState(initialIndex)
    const modalRef = useRef(null);


    const handleBackgroundClick = (e) => {
        const classesToCheck = [styles.carouselSlide, 'control-arrow', 'control-dots','dot'];
        const hasClass = classesToCheck.some(className => e.target.className.includes(className));

        if (!hasClass) {
            onClose();
        }
    };
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (
        <div className={styles.photoModal} ref={modalRef} onClick={handleBackgroundClick}>
            <div className={styles.carouselContainer}>
                <button className={styles.closeButton} onClick={onClose}>✕</button>
                <Carousel
                    selectedItem={slide}
                    onClickItem={setSlide}
                    showThumbs={true}
                    dynamicHeight={true}
                    infiniteLoop={true}
                    emulateTouch={true}
                    showStatus={false}
                >
                    {photos.map((photo, index) => (
                        <div key={index} onClick={() => console.log(1)} className={styles.carouselSlide}>
                            <picture key={photo._id}>
                                <source srcSet={toWebp(`${VITE__API}/${type}/${photo}`)}/>
                                <img
                                    src={`${VITE__API}/${type}/${photo}`}
                                    alt={`${VITE__API}/${type}/${photo}`}/>
                                {/*<img loading="lazy"  src="https://via.placeholder.com/374" alt=""/>*/}
                            </picture>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default PhotoModal;
