import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade} from "swiper";

const HeroSlider = () => {
    return (
            <section className="hero">
                <div className="hero__container">
                    <div className="hero__body">

                        <div className="hero__slider swiper">

                            <Swiper
                                loop
                                noSwiping

                                effect="fade"
                                slidesPerView={1}
                                className="hero__wrapper swiper-wrapper"
                                modules={[EffectFade, Autoplay]}
                                observer={true}
                                observeParents={true}
                                speed={800}
                                fadeEffect={{
                                    crossFade: true
                                }}
                                autoplay={{
                                    delay: 5000, disableOnInteraction: false
                                }}
                            >
                                <SwiperSlide className="hero__slide slide-hero swiper-slide">
                                    <div className="slide-hero__title">Не нужно думать куда пойти, ориентируйтесь по
                                        нашим рейтингам.
                                    </div>
                                    <div className="slide-hero__decors">
                                        <div className="slide-hero__decor slide-hero__decor_1"></div>
                                        <div className="slide-hero__decor slide-hero__decor_2"></div>
                                        <div className="slide-hero__decor slide-hero__decor_3"></div>
                                        <div className="slide-hero__decor slide-hero__decor_4"></div>
                                        <div className="slide-hero__decor slide-hero__decor_5"></div>
                                        <div className="slide-hero__decor slide-hero__decor_6"></div>
                                        <div className="slide-hero__decor slide-hero__decor_7"></div>
                                        <div className="slide-hero__decor slide-hero__decor_8"></div>
                                        <div className="slide-hero__decor slide-hero__decor_9"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="hero__slide slide-hero swiper-slide">
                                    <div className="slide-hero__title">
                                        {/*{!!user?.username ? user.username : 'is not tg'}*/}
                                        Думать нужно думать куда пойти
                                    </div>
                                    <div className="slide-hero__decors">
                                        <div className="slide-hero__decor slide-hero__decor_10"></div>
                                        <div className="slide-hero__decor slide-hero__decor_11"></div>
                                        <div className="slide-hero__decor slide-hero__decor_12"></div>
                                        <div className="slide-hero__decor slide-hero__decor_13"></div>
                                        <div className="slide-hero__decor slide-hero__decor_14"></div>
                                        <div className="slide-hero__decor slide-hero__decor_15"></div>
                                        <div className="slide-hero__decor slide-hero__decor_16"></div>
                                        <div className="slide-hero__decor slide-hero__decor_17"></div>
                                        <div className="slide-hero__decor slide-hero__decor_18"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="hero__slide slide-hero swiper-slide">
                                    <div className="slide-hero__title">Ориентируйтесь нужно думать куда пойти, по
                                        нашим.
                                    </div>
                                    <div className="slide-hero__decors">
                                        <div className="slide-hero__decor slide-hero__decor_1"></div>
                                        <div className="slide-hero__decor slide-hero__decor_2"></div>
                                        <div className="slide-hero__decor slide-hero__decor_3"></div>
                                        <div className="slide-hero__decor slide-hero__decor_4"></div>
                                        <div className="slide-hero__decor slide-hero__decor_5"></div>
                                        <div className="slide-hero__decor slide-hero__decor_6"></div>
                                        <div className="slide-hero__decor slide-hero__decor_7"></div>
                                        <div className="slide-hero__decor slide-hero__decor_8"></div>
                                        <div className="slide-hero__decor slide-hero__decor_9"></div>
                                    </div>

                                </SwiperSlide>
                            </Swiper>

                            <div className="hero__pagination pagination"></div>
                        </div>

                    </div>
                    <div className="hero__decors">
                        <div className="hero__decor hero__decor_1"></div>
                        <div className="hero__decor hero__decor_2"></div>
                        <div className="hero__decor hero__decor_3"></div>
                        <div className="hero__decor hero__decor_4"></div>
                        <div className="hero__decor hero__decor_5"></div>
                        <div className="hero__decor hero__decor_6"></div>
                        <div className="hero__decor hero__decor_7"></div>
                        <div className="hero__decor hero__decor_8"></div>
                        <div className="hero__decor hero__decor_9"></div>
                    </div>
                </div>
            </section>

    );
};

export default HeroSlider;
