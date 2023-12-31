import React, {useEffect, useRef, useState} from 'react';
import ReactStars from "react-rating-stars-component/dist/react-stars.js";
import close from '../../assets/img/close.svg'
import icon from '../../assets/img/icon.svg'
import {useSelector} from "react-redux";
import {toWebp} from "../../utils.js";
import { useLazyFindPlaceImagesQuery} from "../../redux/place/place.api.js";
import {useLazyFindEventImagesQuery} from "../../redux/event/event.api.js";
import s from './RateForm.module.scss'

const VITE__API = import.meta.env.VITE__API
const RateForm = ({data, setIsShow, ratingChanged, handleRateSpace, setText, text, rating, error, info, isEvent}) => {
    const [findPlacePhotos] = useLazyFindPlaceImagesQuery()
    const [findEventPhotos] = useLazyFindEventImagesQuery()
    const [photos, setPhotos] = useState([])
    const [images, setImages] = useState([])
    const imageInput = useRef(null);


    const handleImageRemove = index => {
        setImages(images.filter((image, i) => i !== index));
    };
    const handleImageUpload = event => {
        let imagesArray = [...images];
        for (let i = 0; i < event.target.files.length; i++) {
            if (imagesArray.length >= 8) break; // Restrict to 8 images
            imagesArray.push(event.target.files[i]); // Save the File objects
        }
        setImages(imagesArray);
    };

    useEffect(()=>{
        const init = async ()=>{
            let photos = []
            if(isEvent){
                photos = await findEventPhotos(data?._id)
            }else{
                photos = await findPlacePhotos(data?._id)
            }
            console.log({photos})
            setPhotos(photos?.data)
        }
        init()
    },[data._id])
    const [symbols, setSymbols] = useState(1000 - text.length)
    const {ratingsNames} = useSelector(state => state.place)
    const location = info?.location?.value ? info.location.value : ''
    const name = data.name
    const handleTextChange = e => {
        const text = e.target.value
        setSymbols(1000 - text.length)
        if (1000 - e.target.value.length !== 0) setText(text)
    }

    return (

        <section className="comment">
            <div className="comment__container">
                <div className="comment__body">
                    <div className="comment__close" onClick={() => setIsShow(false)}><img loading="lazy"  src={close} alt=""/></div>
                    <div className="comment__restaurant">
                        {
                            photos?.length && (
                                <div className="comment__image-ibg">
                                    <picture>
                                        <source  srcSet={toWebp(`${VITE__API}/${isEvent ? 'events':'places'}/${photos[0]?.photo}`)}/>
                                        <img loading="lazy"  src={`${VITE__API}/${isEvent ? 'events':'places'}/${photos[0]?.photo}`} alt=""/>
                                    </picture>
                                    {/*<img loading="lazy"  src={firstPhoto} alt={firstPhoto}/>*/}
                                </div>
                            )
                        }

                        <div className="comment__content">
                            <div className="comment__name">{name}</div>
                            <div className="comment__list-product list-product">
                                {
                                    location ?
                                        <div className="list-product__item _icon-location">{location}</div> : <></>

                                }
                            </div>
                        </div>
                    </div>


                    <div className="comment-form">
                        <div className="comment__title">Оцените свое
                            пребывание здесь
                        </div>


                        {!isEvent &&<div className="comment-form__rating rating rating_set">
                            <div className="rating__body">
                                <div className="rating__active"></div>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={32}
                                    activeColor="#ffd700"
                                    value={rating}
                                />
                            </div>
                            <div className="rating__value">{rating}</div>
                            {
                                rating ? <div className="rating__text">{ratingsNames[rating - 1]}</div> : <></>
                            }


                        </div>}
                        <div className="comment-form__title">Напишите отзыв</div>
                        <div className="comment-form__block">

                            <textarea value={text} onChange={handleTextChange} name="" id=""
                                      className="comment-form__textarea"
                                      placeholder={rating ? `Вы оценили этого объекта на ${rating} балла из 5, почему? Расскажите, пожалуйста, подробнее.` : ' Расскажите, пожалуйста, подробнее.'}></textarea>
                            <div className="comment-form__info">Осталось символов {symbols}/1000</div>
                        </div>
                        <div className="comment-form__label">
                            <label htmlFor="inp1">
                                <div onClick={() => imageInput.current.click()}  className="comment-form__icon"><img loading="lazy"  src={icon} alt=""/></div>
                                Прикрепите фото с Вашего визита
                            </label>
                        </div>
                        <div className={s.photos}>
                            <input
                                type='file'
                                ref={imageInput}
                                accept='image/*'
                                multiple
                                onChange={handleImageUpload}
                                className={s.imageInput}
                            />

                            <div className={s.imagesContainer}>
                                {images.map((image, index) => (
                                    <div className={s.imageWrapper} key={index}>
                                        <img src={URL.createObjectURL(image)} alt=''/>
                                        <button className={s.removeButton} onClick={() => handleImageRemove(index)}>удалить</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <span className={'error'}>{error}</span>
                        <button onClick={()=>handleRateSpace(images)} className="comment-form__button button">Отправить</button>
                    </div>
                </div>
            </div>
        </section>


    );
};

export default RateForm;
