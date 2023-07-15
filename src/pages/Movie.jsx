import  {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useGetMovieFullInfoByIdQuery} from "../redux/event/event.api.js";
import {clsx} from "clsx";
import {monthNames, daysNames} from './../utils.js'


function isPased(inputTime) {
    const currentDateTimeUzbekistan = new Date();
    currentDateTimeUzbekistan.setHours(currentDateTimeUzbekistan.getHours() + 5); // UTC + 5 годин (Часовий пояс Узбекистану)

    const inputTimeParts = inputTime.split(':');
    const inputDateTime = new Date();
    inputDateTime.setHours(parseInt(inputTimeParts[0]));
    inputDateTime.setMinutes(parseInt(inputTimeParts[1]));

    const targetDateTime = new Date(inputDateTime.getTime() + 100 * 60 * 1000);

    return targetDateTime <= currentDateTimeUzbekistan;
}

const Movie = () => {
    const {id} = useParams()
    const {data, isLoading, isSuccess} = useGetMovieFullInfoByIdQuery(id)
    const [selectedDay, setSelectedDay] = useState('')
    const [selectedMonth, setSelectedMonth] = useState('')

    useEffect(() => {
		console.log(data)

        if (isSuccess) {
            console.log(data)
			if(data.showtimes.length){
     			setSelectedDay(Object.keys(data.showtimes[0].data)[0])
            	setSelectedMonth(data.showtimes[0].month)
			}
       
        }
    }, [data, isSuccess])
    if (!isSuccess) return 'loading'
    return (
        <section className="event">
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
                        <div className="event__image-ibg"><img src={data.movie.photo.photo} alt=""/></div>
                    </div>
                    <div className="event__content content-event">
                        <div className="content-event__top">
                            <div className="content-event__col">
                                <div className="content-event__maintitle">{data.movie.name}</div>
                                {/*<div className="content-event__subtitle">The Flash</div>*/}
                            </div>
                            <div className="content-event__col">
                                <a className="content-event__repost _icon-repost">ПОДЕЛИТЬСЯ</a>
                            </div>
                        </div>
                        <ul className="content-event__list">
							{
								data.showtimes.lenght &&
									<li className="content-event__item">
										<div className="content-event__item-title">Когда:</div>
										<div className="content-event__item-text">Сегодня
											в {data.showtimes.find(e=>e.month===selectedMonth)?.data[selectedDay]?.length} кинотеатрах
										</div>
									</li>
							}
                            <li className="content-event__item">
                                <div className="content-event__item-title">Длительность:</div>
                                <div className="content-event__item-text">144 мин.</div>
                            </li>
                        </ul>

                        <div data-showmore className="content-event__showmore event-showmore">
                            <div data-showmore-content="168" className="event-showmore__content">Физик-ядерщик Барри
                                Аллен после несчастного случая оказывается облучённым ядохимикатами. Чудом оставшись в
                                живых, приняв смертельную долю химических веществ и метаморфоз, произошедших... Lorem
                                ipsum dolor sit amet consectetur, adipisicing elit. Ad similique natus atque
                                exercitationem. Quod, libero, dolor officia pariatur expedita rem molestiae cumque qui
                                eos fuga quisquam consequatur culpa impedit illum!
                            </div>
                            <button hidden data-showmore-button type="button" className="event-showmore__more"><span>Читать полностью</span><span>Скыть</span>
                            </button>
                        </div>

                        <div className="content-event__title">РАСПИСАНИЕ СЕАНСОВ</div>

                                               <div className="calendar date-slider_white">
							{data?.showtimes?.map(month=>{
								
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
														className={clsx(day===selectedDay && monthNum===selectedMonth ? "slide-date_current" : 'calendar_movie', "poster__date-slide",'calendar_day')} >
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

                        <div className="content-event__timetable timetable">

                            {
                                data?.showtimes.find(m=>m.month===selectedMonth)?.data[selectedDay]?.map(e => (

                                    <>
                                        <div className="timetable__title">{e.cinemas.name}</div>

                                        <ul className="timetable__items active">
                                            {e.times.split(' | ').map(e => {
                                                const passed = isPased(e) && Object.keys(data.showtimes[0].data)[0]===selectedDay

                                                return <li key={e} style={passed ? {opacity: 0.5} : {}}
                                                           className="timetable__item">{e}</li>
                                            })}
                                        </ul>

                                    </>


                                ))
                            }


                        </div>
                        <button className="content-event__button _icon-favorite">МНЕ НРАВИТСЯ</button>

                    </div>
                </div>
            </div>
        </section>
    )


}

export default Movie;
