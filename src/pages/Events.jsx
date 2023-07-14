import {Swiper, SwiperSlide} from "swiper/react";
import {useGetMoviesWithShowtimesQuery} from "../redux/event/event.api.js";
import {useEffect, useState} from "react";
import {clsx} from "clsx";
import {useNavigate} from "react-router-dom";

const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const Events = () => {
    const {data, isLoading, isSuccess} = useGetMoviesWithShowtimesQuery()
    const [selectedDay, setSelectedDay] = useState('')
    useEffect(() => {
        if (isSuccess) {
            console.log(data)
            setSelectedDay(Object.keys(data[0].data)[0])
        }
    }, [data, isSuccess])
    const navigate = useNavigate()
    if(!isSuccess || isLoading) return 'loading'
    return (
        <>

            <section className="poster">
                <div className="poster__container">
                    <div className="poster__body">
                        <div className="poster__top">
                            {/*<a href="#" className="poster__back">НАЗАД</a>*/}
                            <button className="poster__button _icon-arrow-bottom">СОБЫТИЯ</button>
                            <div className="poster__label">КИНО</div>
                            <ul className="poster__list">
                                <li className="poster__item active">КИНО</li>
                                <li className="poster__item">КОНЦЕРТЫ</li>
                                <li className="poster__item">ТЕАТР</li>
                                <li className="poster__item">ВЫСТАВКИ</li>
                                <li className="poster__item">ВСЕ</li>
                                <li className="poster__item">ЭКСКУРСИИ</li>
                                <div className="poster__list-close"></div>
                            </ul>
                        </div>

                        {/*<div className="poster__slider">*/}
                        {/*    <Swiper className="poster__wrapper swiper-wrapper" observer={true}*/}
                        {/*            observeParents={true}*/}
                        {/*            speed={800}*/}
                        {/*            slidesPerView={1}*/}
                        {/*            spaceBetween={10}*/}
                        {/*    >*/}
                        {/*        <SwiperSlide href="#" className="poster__slide slide-poster swiper-slide">*/}
                        {/*            <div className="slide-poster__img-ibg">*/}
                        {/*                <img src="https://via.placeholder.com/599" alt=""/>*/}
                        {/*            </div>*/}
                        {/*            <div className="slide-poster__content">*/}
                        {/*                <div className="slide-poster__label">ЭКСКУРСИЯ</div>*/}
                        {/*                <div className="slide-poster__inner">*/}
                        {/*                    <div className="slide-poster__title">Северная Венеция</div>*/}
                        {/*                    <div className="slide-poster__date">*/}
                        {/*                        <span>Ужедневно по расписанию</span>*/}
                        {/*                        <span>Причал на Фонтанке 53</span>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </SwiperSlide>*/}
                        {/*        <SwiperSlide href="#" className="poster__slide slide-poster swiper-slide">*/}
                        {/*            <div className="slide-poster__img-ibg"><img src="@img/poster/01.jpg" alt=""/>*/}
                        {/*            </div>*/}
                        {/*            <div className="slide-poster__content">*/}
                        {/*                <div className="slide-poster__label">ЭКСКУРСИЯ</div>*/}
                        {/*                <div className="slide-poster__inner">*/}
                        {/*                    <div className="slide-poster__title">Северная Венеция</div>*/}
                        {/*                    <div className="slide-poster__date">*/}
                        {/*                        <span>Ужедневно по расписанию</span>*/}
                        {/*                        <span>Причал на Фонтанке 53</span>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </SwiperSlide>*/}
                        {/*    </Swiper>*/}
                        {/*    <div className="poster__pagination pagination"></div>*/}
                        {/*</div>*/}

                        <div className="poster__date-title">ИЮЛЬ</div>
                        <div className="poster__date-slider date-slider">
                            <Swiper className="poster__date-wrapper swiper-wrapper"
                                    observer={true}
                                    observeParents={true}
                                    speed={800}
                                    slidesPerView={5}
                                    spaceBetween={0}
                            >
                                {
                                    Object.keys(data[0].data).map(day => {
                                        let month = data[0].month; // Червень, бо місяці рахуються з 0
                                        let year = new Date().getFullYear(); // Поточний рік
                                        let date = new Date(year, month, Number(day));
                                        let dayNameI = date.getDay();
                                        let dayName = days[dayNameI]
                                        //['Сб','Вс'].includes(dayName) && 'slide-date_holiday',
                                        return <SwiperSlide onClick={()=>setSelectedDay(day)}
                                            className={clsx("poster__date-slide",  "slide-date", day === selectedDay && "slide-date_current", "swiper-slide")}>
                                            <div className="slide-date__name">{dayName}</div>
                                            <div className="slide-date__num">{day}</div>
                                        </SwiperSlide>
                                    })
                                }

                            </Swiper>
                        </div>

                        <div className="poster__text">Мы сделали большой выбор мест для посещения, где вы видите те
                            места, которые пользуются спросом людей больше всего.
                        </div>

                    </div>
                </div>
            </section>

            <section className="poster-top">
                <div className="poster-top__container">
                    <div className="poster-top__body">
                        <h2 className="poster-top__title">ТОП Кино</h2>
                        <div className="poster-top__items">
                            {
                                data[0].data[selectedDay]?.map((movie,i)=>{
                                    return <div key={i} onClick={()=>navigate(`/movie/${movie.movie._id}`)} className="poster-top__item">
                                        <div className="poster-top__content">
                                            <h3 className="poster-top__item-title">
                                                <a href="#">{i+1}. {movie.movie.name}</a>
                                            </h3>
                                            <div className="poster-top__inner">
                                                <div className="poster-top__label">КИНО</div>
                                                <a href="#" className="poster-top__link _icon-link"></a>
                                            </div>
                                        </div>
                                        <a href="#" className="poster-top__img-ibg">
                                            <img src={movie.movie.photo.photo} alt=""/>
                                        </a>
                                    </div>

                                })
                            }
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Events
