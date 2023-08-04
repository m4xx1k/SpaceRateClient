import React, {lazy, Suspense, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {clsx} from "clsx";
import {monthNames, daysNames, toWebp} from './../utils.js'
import {
    useGetEventFullInfoByIdQuery, useRateEventMutation, useToggleFavouriteEventMutation
} from "../redux/event/event.api.js";
import {useFindUserMutation} from "../redux/auth/authApiSlice.js";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import RateForm from "../components/RateForm/RateForm.jsx";
import ReactStars from "react-rating-stars-component";
import {useTelegram} from "../hooks/useTelegram.js";
const EventReviews = lazy(()=>import('../components/EventReviews'))

function isPased(inputTime) {
    const currentDateTimeUtc = new Date();
    const currentDateTimeUzbekistan = new Date(currentDateTimeUtc.getTime() + 5 * 60 * 60 * 1000); // UTC + 5 годин (Часовий пояс Узбекистану)

    const inputTimeParts = inputTime.split(':');
    const inputDateTime = new Date(currentDateTimeUzbekistan.getTime());
    inputDateTime.setUTCHours(parseInt(Number(inputTimeParts[0])));
    inputDateTime.setUTCMinutes(parseInt(Number(inputTimeParts[1])));

    return inputDateTime.getTime() <= currentDateTimeUzbekistan.getTime()
}

const VITE__API = import.meta.env.VITE__API

const EventLoading = () => {
    return (<section className="event">
            <div className="event__container">
                <div className="event__body">
                    <div className="event__poster">
                        <div className="event__top">
                            <div className="event__control">
                                {/*<a href="#" className="event__back">НАЗАД</a>*/}
                                <div className="event__label">КИНО</div>
                            </div>
                            <div className="event__age">16+</div>
                        </div>
                        <div style={{height: '90vw', background: '#404040'}}
                             className="event__image-ibg skeleton-loading"></div>
                    </div>
                    <div className="event__content content-event">
                        <div className="content-event__top">
                            <div className="content-event__col">
                                <div className="content-event__maintitle skeleton-loading"
                                     style={{width: 200, height: 36, background: '#404040'}}></div>
                                {/*<div className="content-event__subtitle">The Flash</div>*/}
                            </div>
                            <div className="content-event__col">
                                <a className="content-event__repost _icon-repost">ПОДЕЛИТЬСЯ</a>
                            </div>
                        </div>


                        <div data-showmore style={{width: '95%', height: '90vw', background: '#404040'}}
                             className="content-event__showmore event-showmore skeleton-loading">
                            <div data-showmore-content="168" className="event-showmore__content">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>)
}
const Event = () => {

    const {id} = useParams()
    // const {user} = useTelegram()
    const user = {id: '466439009'}

    const {data, isLoading, isSuccess} = useGetEventFullInfoByIdQuery({id, telegramId: user?.id})
    const [selectedDay, setSelectedDay] = useState('')
    const [selectedMonth, setSelectedMonth] = useState('')
    const [toggleFavourite] = useToggleFavouriteEventMutation()
    const [findUser] = useFindUserMutation()
    const [isLiked, setIsLiked] = useState(false)
    const navigate = useNavigate()


    const {ratingsNames} = useSelector(state => state.place)
    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const [isShow, setIsShow] = useState(false)
    const [rateEvent] = useRateEventMutation()

    const handleRateSpace = async images => {
        // const {data: isUserLogged} = await findUser({telegramId: user.id})
        const isUserLogged = true
        if (isUserLogged) {
            if (text) {
                const formdata = new FormData()
                formdata.append('telegramId', `${user.id}`)
                formdata.append('eventId', id)
                formdata.append('text', text)
                formdata.append('value', 0)
                images.forEach((image) => {
                    formdata.append(`photos`, image);
                });
                const res = await rateEvent(formdata)
                console.log({res})
                setIsShow(false)
            } else {
                setError('Заполните текст')
            }
        } else navigate('/login')

    }

    const handleToggleFavourite = async () => {
        if (!user) {
            window.location.replace('https://t.me/goodjoyuz_bot')
            return
        }
        const {data} = await findUser({telegramId: user.id})
        console.log({res: data})
        if (data) {
            try {
                await toggleFavourite({eventId: id, telegramId: user?.id})
                setIsLiked(prev => !prev)
            } catch (e) {
                console.log(e)
            }
        } else {
            navigate('/login')
        }
    }
    useEffect(() => {
        if (isSuccess) {
            setIsLiked(data.event?.isFavourite)
            if (data.dates?.length) {
                setSelectedDay(Object.keys(data.dates[0].data)[0])
                setSelectedMonth(data.dates[0].month)
            }
        }
    }, [data, isSuccess])
    if (!isSuccess) return <EventLoading/>
    return (<>{isShow ? <RateForm data={data.event} placeId={id} text={text}
                                  error={error}
                                  setError={setError}
                                  setIsShow={setIsShow} setText={setText}
                                  handleRateSpace={handleRateSpace} isEvent={true}/> : <>
            <section className="event">
                <div className="event__container">
                    <div className="event__body">
                        <div className="event__poster">
                            <div className="event__top">
                                <div className="event__control">
                                    {/*<a href="#" className="event__back">НАЗАД</a>*/}
                                    <div className="event__label">{data.event.type.name}</div>
                                </div>
                                <div className="event__age">


                                </div>
                            </div>
                            {data.event.photos?.length && <div className="event__image-ibg">
                                <picture>
                                    <source
                                        srcSet={toWebp(`${VITE__API}/events/${data.event.photos[0]?.photo}`)}/>
                                    <img loading="lazy"  src={`${VITE__API}/events/${data.event.photos[0]?.photo}`} alt=""/>
                                </picture>
                            </div>


                            }
                        </div>
                        <div className="event__content content-event">
                            <div className="restaurant__grade grade-restaurant">


                                {/*<div className="grade-restaurant__rating rating">*/}

                                {/*    <div style={{*/}
                                {/*        color: '#fffafa', fontSize: 14*/}
                                {/*    }}>{data.event.rating.toFixed(1)}</div>*/}
                                {/*    <span className={'rating__star'}>★</span>*/}
                                {/*</div>*/}
                                {/*<span style={{color: '#fffafa'}}>*/}
                                {/*    {data.event.rating ?*/}

                                {/*        ratingsNames[Math.ceil(data.event.rating) - 1].toUpperCase() : '-'}*/}
                                {/*</span>*/}
                            </div>

                            <div className="content-event__top">
                                <div className="content-event__col">
                                    <div className="content-event__maintitle">{data.event.name}</div>
                                    {/*<div className="content-event__subtitle">The Flash</div>*/}
                                </div>
                                <div className="content-event__col">
                                    <a href={`https://telegram.me/share/url?url=https://goodjoy.uz/event/${id}&text=${data.event.name}`} className="content-event__repost _icon-repost">ПОДЕЛИТЬСЯ</a>
                                </div>
                            </div>
                            <ul className="content-event__list">

                                {data.event.info.map(info => <li key={info.name} className="content-event__item">
                                    <div className="content-event__item-title">{info.name}:</div>
                                    <div className="content-event__item-text">{info.value}</div>
                                </li>)}

                            </ul>

                            <div data-showmore className="content-event__showmore event-showmore">
                                <div data-showmore-content="168" className="event-showmore__content">
                                    {data.event.description}
                                </div>
                                <button hidden data-showmore-button type="button" className="event-showmore__more">
                                    <span>Читать полностью</span><span>Скыть</span>
                                </button>
                            </div>
                            <div className="restaurant__hide">
                                <button  style={{color: '#fffafa'}} onClick={() => setIsShow(true)} className="rewievs__btn _icon-comment">
                                    <span style={{color: '#fffafa'}}>ОСТАВИТЬ ОТЗЫВ</span></button>
                                {/*<div className="rating rating_lite rating_set">*/}
                                {/*    <ReactStars*/}
                                {/*        count={5}*/}
                                {/*        onChange={ratingChanged}*/}
                                {/*        size={32}*/}
                                {/*        activeColor="#ffd700"*/}
                                {/*        value={rating}*/}
                                {/*    />*/}
                                {/*    <div className="rating__value"></div>*/}
                                {/*</div>*/}

                            </div>

                            <div className="content-event__title">ДАТы</div>

                            <div className="calendar date-slider_white">
                                {data?.dates?.map(month => {

                                    return (<div className='calendar_month' key={month.month}>
                                                    <span
                                                        className='calendar_month-name'>{monthNames[month.month].toUpperCase()}</span>
                                            <div className='calendar_days'>
                                                {Object.keys(month.data).map(day => {
                                                    let monthNum = month.month; // Червень, бо місяці рахуються з 0
                                                    let year = new Date().getFullYear(); // Поточний рік
                                                    let date = new Date(year, monthNum, Number(day));
                                                    console.log(year, monthNum, Number(day))
                                                    let dayNameI = date.getDay();
                                                    let dayName = daysNames[dayNameI]
                                                    return (


                                                        <div onClick={() => {
                                                            setSelectedDay(day)
                                                            setSelectedMonth(monthNum)
                                                        }}
                                                             key={day}
                                                             className={clsx(day === selectedDay && monthNum === selectedMonth ? "slide-date_current" : 'calendar_movie', "poster__date-slide", 'calendar_day')}>
                                                            <div className="slide-date__name">{dayName}</div>
                                                            <div className="slide-date__num">{day}</div>
                                                        </div>
                                                        // <div className='calendar_day' key={date}>
                                                        // 	<span>{dayName}</span>
                                                        // 	<span>{day}</span>
                                                        // </div>
                                                    )
                                                })}
                                            </div>
                                        </div>)

                                })}
                            </div>

                            <div className="content-event__timetable timetable">

                                {data?.dates?.find(m => m.month === selectedMonth)?.data[selectedDay]?.map(e => {


                                    return <ul key={e} className="timetable__items active">


                                        {!!e && <li
                                                    style={isPased(e.split(' ')[0]) && Object.keys(data.dates[0].data)[0] === selectedDay ? {opacity: 0.5} : {}}
                                                    className="timetable__item">{e}</li>}
                                    </ul>


                                })}


                            </div>
                            <button onClick={handleToggleFavourite}
                                    className={clsx(isLiked && "event__liked", "content-event__button", "_icon-favorite")}
                            >МНЕ НРАВИТСЯ
                            </button>
                        </div>
                    </div>
                </div>
                <Suspense fallback={<></>}><EventReviews eventId={id} userId={user?.id}/></Suspense>

            </section>

        </>


        }</>)
}

export default Event;
