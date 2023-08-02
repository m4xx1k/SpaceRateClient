import React, {useState} from 'react';
import {useFetchAllEventRatingsQuery} from "../redux/event/event.api";
import {formatDate, toWebp} from "../utils.js";
import PhotoModal from "./PhotoModal/PhotoModal.jsx";
const VITE__API = import.meta.env.VITE__API

const EventReviews = ({eventId, userId}) => {
    const {data, isLoading, isSuccess} = useFetchAllEventRatingsQuery({
        eventId,
        telegramId: userId
    })
    const [isVisibleCarousel, setIsVisibleCarousel] = useState(false)
    const [photoIndex,setPhotoIndex] = useState(0)
    const [photos,setPhotos] = useState([])
    const handleShowCarousel = (e,i)=>{
        setPhotos(e?.photos)
        setIsVisibleCarousel(true)
        setPhotoIndex(i)
    }
    const handleCloseCarousel = ()=>setIsVisibleCarousel(false)
    return (

        <section className="rewievs" style={{color:'#fffafa',background:'#212121'}}>
            <div className="rewievs__container">
                <div className="rewievs__body">
                    <div className="rewievs__top">
                        <h2 className="rewievs__title">ОТЗЫВЫ:</h2>
                        <div className="rewievs__control">
                            <button className="none rewievs__btn _icon-comment">
                                <span>ОСТАВИТЬ ОТЗЫВ</span>
                            </button>
                            <div
                                className="rewievs__navigation navigation navigation_small navigation_black">
                            </div>
                        </div>
                    </div>
                    <div className={'rewievs__list'}>
                        {
                            (!isLoading && isSuccess) ? data.ratings.map((e, index) => {
                                    return (
                                        <div
                                            className="rewievs__list_item slider-rewievs__slide slide-rewievs swiper-slide"
                                            key={index}>
                                            <div className="slide-rewievs__top">
                                                <div className="slide-rewievs__ico"><img
                                                    src={e?.user?.picture ? e.user.picture : 'Username'}
                                                    alt=""/>
                                                </div>
                                                <div className="slide-rewievs__info">
                                                    <div
                                                        className="slide-rewievs__name">{e?.user?.name ? e.user.name : 'Пользователь'}</div>

                                                </div>
                                            </div>
                                            <div className={'rewievs__photos'}>
                                                {e?.photos?.map((photo,i)=>(
                                                    <picture onClick={()=>handleShowCarousel(e,i)} key={photo._id}>
                                                        <source className={'rewievs__photo'} srcSet={toWebp(`${VITE__API}/events/${photo.photo}`)}/>
                                                        <img className={'rewievs__photo'}
                                                             src={`${VITE__API}/events/${photo.photo}`}
                                                             alt={`${VITE__API}/events/${photo.photo}`}/>
                                                        {/*<img loading="lazy"  src="https://via.placeholder.com/374" alt=""/>*/}
                                                    </picture>
                                                ))}
                                            </div>
                                            {
                                                isVisibleCarousel && photos?.length &&
                                                <PhotoModal type={'events'} photos={photos.map(e=>e.photo)} onClose={handleCloseCarousel} initialIndex={photoIndex}/>
                                            }
                                            <div className="slide-rewievs__text">{e.text}
                                            </div>
                                            <div
                                                className="slide-rewievs__date">{formatDate(e.date)}</div>
                                        </div>
                                    )
                                })
                                :

                                <>
                                    <div
                                        className="rewievs__list_item-loading slider-rewievs__slide slide-rewievs swiper-slide"></div>
                                    <div
                                        className="rewievs__list_item-loading slider-rewievs__slide slide-rewievs swiper-slide"></div>
                                </>
                        }

                    </div>
                </div>
            </div>
        </section>


    )
}


export default EventReviews;
