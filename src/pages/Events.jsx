import {
    useGetEventsWithShowtimesByTypeIdQuery,

} from "../redux/event/event.api.js";
import {useEffect, useState} from "react";
import {clsx} from "clsx";
import {useNavigate} from "react-router-dom";
import {monthNames, daysNames, toWebp} from './../utils.js'
import {Swiper, SwiperSlide} from "swiper/react";
import {useParams} from "react-router";
const VITE__API = import.meta.env.VITE__API

const EventsLoader = ()=>{
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
                        <div className="events-poster__slider" style={{marginTop:16}}>
                            <Swiper className="events-poster__wrapper swiper-wrapper">

                                <SwiperSlide style={{height: '90vw', width: '90vw',borderRadius:36}} className="events-poster__slide slide-events-poster swiper-slide skeleton-loading">

                                </SwiperSlide>



                            </Swiper>
                            <div className="events-poster__pagination pagination"></div>
                        </div>
                        <div className="calendar">

                            <div className='calendar_month'>
                                <span style={{width:42,height:16}} className='calendar_month-name skeleton-loading'></span>
                                <div className='calendar_days'>
                                    {
                                        Array(7).fill('').map((_,i)=>

                                            <div style={{width:70,height:74, marginLeft:4}} key={i} className={clsx("poster__date-slide",'calendar_day','skeleton-loading')} >
                                                <div className="slide-date__name"></div>
                                                <div className="slide-date__num"></div>
                                            </div>


                                        )
                                    }
                                </div>
                            </div>

                        </div>

                        <div className="poster__text">Сеансы, кинотеатры, афиша, премьеры!
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
const Events = () => {
    const {type} = useParams()
    const {data, isLoading, isSuccess} = useGetEventsWithShowtimesByTypeIdQuery(type)
    const [selectedDay, setSelectedDay] = useState('')
    const [selectedMonth, setSelectedMonth] = useState('')
    useEffect(() => {
        if (isSuccess) {
            setSelectedDay(Object.keys(data[0].data)[0])
            setSelectedMonth(data[0].month)
        }
    }, [data, isSuccess])
    const navigate = useNavigate()
    if(!isSuccess || isLoading) return <EventsLoader/>
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
                        {/*<div className="events-poster__slider" style={{marginTop:16}}>*/}
                        {/*    <Swiper className="events-poster__wrapper swiper-wrapper">*/}
                        {/*        {*/}
                        {/*            isSuccessPremieres && premieres.map((e,i)=>(*/}
                        {/*                <SwiperSlide onClick={()=>navigate(`/event/${e._id}`)} key={e.name} className="events-poster__slide slide-events-poster swiper-slide">*/}
                        {/*                    {*/}
                        {/*                        !e.photos.lenght &&*/}
                        {/*                        <div className="slide-events-poster__img-ibg"><img src={e.photos[0].photo} alt=""/>*/}
                        {/*                        </div>*/}
                        {/*                    }*/}

                        {/*                    <div className="slide-events-poster__content">*/}
                        {/*                        <div className="slide-events-poster__top">*/}
                        {/*                            <div className="slide-events-poster__number">№{i+1}</div>*/}
                        {/*                            <div className="slide-events-poster__grade grade"><span></span></div>*/}
                        {/*                        </div>*/}
                        {/*                        <div className="slide-events-poster__bottom">*/}
                        {/*                            <div className="slide-events-poster__title">{e.name}</div>*/}
                        {/*                            <div className="slide-events-poster__inner">*/}
                        {/*                                <div className="slide-events-poster__date">*/}

                        {/*                                </div>*/}
                        {/*                                <div style={{textTransform:'uppercase'}} className="slide-events-poster__mark">премьера</div>*/}
                        {/*                            </div>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </SwiperSlide>*/}
                        {/*            ))*/}
                        {/*        }*/}
                        {/*        <a href="#" >*/}

                        {/*        </a>*/}

                        {/*    </Swiper>*/}
                        {/*    <div className="events-poster__pagination pagination"></div>*/}
                        {/*</div>*/}
                        <div className="calendar">
                            {data?.map(month=>{

                                return (
                                    <div className='calendar_month' key={month.month}>
                                        <span className='calendar_month-name'>{monthNames[month.month].toUpperCase()}</span>
                                        <div className='calendar_days'>
                                            {
                                                Object.keys(month.data).map(day=>{
                                                    let monthNum = month.month; // Червень, бо місяці рахуються з 0
                                                    let year = new Date().getFullYear(); // Поточний рік
                                                    let date = new Date(year, monthNum, Number(day));
                                                    let dayNameI = date.getDay();
                                                    let dayName = daysNames[dayNameI]
                                                    return (


                                                        <div onClick={()=>{
                                                            setSelectedDay(day)
                                                            setSelectedMonth(monthNum)
                                                        }}
                                                             key={day}
                                                             className={clsx(day===selectedDay && monthNum===selectedMonth && "slide-date_current", "poster__date-slide",'calendar_day')} >
                                                            <div className="slide-date__name">{dayName}</div><div className="slide-date__num">{day}</div></div>
                                                        // <div className='calendar_day' key={date}>
                                                        // 	<span>{dayName}</span>
                                                        // 	<span>{day}</span>
                                                        // </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )

                            })}
                        </div>

                        <div className="poster__text">Сеансы, кинотеатры, афиша, премьеры!
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
                                !!data && data?.find(el=>el.month===selectedMonth)?.data[selectedDay]?.map((event,i)=>{
                                    return <div key={i} onClick={()=>navigate(`/event/${event.event._id}`)} className="poster-top__item">
                                        <div className="poster-top__content">
                                            <h3 className="poster-top__item-title">
                                                <a href="#">{i+1}. {event.event.name}</a>
                                            </h3>
                                            <div className="poster-top__inner">
                                                <div className="poster-top__label">КИНО</div>
                                                <a href="#" className="poster-top__link _icon-link"></a>
                                            </div>
                                        </div>
                                        {
                                            event.event.photos?.lenght &&
                                            <a href="#" className="poster-top__img-ibg">
                                                <img src={event.event.photos[0].photo} alt=""/>
                                                <picture >
                                                    <source  srcSet={toWebp(`${VITE__API}/events/${photos[0]?.photo}`)}/>
                                                    <img src={`${VITE__API}/events/${photos[0]?.photo}`} alt=""/>
                                                </picture>
                                            </a>
                                        }
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
