import React, {useEffect} from 'react';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useFetchMainAdvertisementsQuery} from "../redux/place/place.api.js";
import {toWebp} from "../utils.js";

const VITE__API = import.meta.env.VITE__API

const HeroSlider = () => {
        const {data} = useFetchMainAdvertisementsQuery()
        const handleAdvertisementClick = (i) => {
            console.log(true)
            window.open(data[i].link, '_blank');

        }
        useEffect(() => console.log(data), [data])
        if (!data) return null; // Додано умову для переконання, що дані існують

        return (
            <section className="hero">
                <div className="hero__body">

                    <div className={'main_slider'}>

                        <Carousel
                            autoPlay
                            interval={5000}
                            showArrows={false}
                            infiniteLoop
                            showThumbs={false}
                            showStatus={false}
                            swipeable
                            transitionTime={800}
                            emulateTouch
                            onClickItem={handleAdvertisementClick}
                        >
                            {data?.map((adv) => (
                                <a href={adv.link} key={adv._id}>
                                    {adv?.photo && (
                                        <picture>
                                            <source className={'main_slide'}
                                                    srcSet={toWebp(`${VITE__API}/categories/${adv?.photo}`)}/>
                                            <img className={'main_slide'} loading="lazy"
                                                 src={`${VITE__API}/categories/${adv?.photo}`} alt=""/>
                                        </picture>
                                    )}
                                </a>
                            ))}
                        </Carousel>

                    </div>

                </div>

            </section>

        );
    }
;

export default HeroSlider;
