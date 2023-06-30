import React, {useState} from 'react';
import ReactStars from "react-rating-stars-component/dist/react-stars.js";
import close from '../../assets/img/close.svg'
import icon from '../../assets/img/icon.svg'
import {useSelector} from "react-redux";
const VITE__API = 'https://api.goodjoy.uz'
const RateForm = ({data,setIsShow, ratingChanged,handleRateSpace,setText, text,rating, error}) => {
    const [symbols, setSymbols] = useState(100-text.length)
    const {ratingsNames} = useSelector(state=>state.place)
    const photo = VITE__API + '/places/' + data.photos[0].photo
    const location = data.info.location.value
    const name = data.place.name
    const handleTextChange = e=>{
        const text =e.target.value
        setSymbols(100-text.length)
        if(100-e.target.value.length!==0) setText(text)
    }

    return (

        <section className="comment">
            <div className="comment__container">
                <div className="comment__body">
                    <div className="comment__close" onClick={()=>setIsShow(false)}><img src={close} alt=""/></div>
                    <div className="comment__restaurant">
                        <div className="comment__image-ibg"><img src={photo} alt=""/></div>
                        <div className="comment__content">
                            <div className="comment__name">{name}</div>
                            <div className="comment__list-product list-product">
                                <div className="list-product__item _icon-location">{location}</div>
                            </div>
                        </div>
                    </div>


                    <form action="#" className="comment-form">
                        <div className="comment__title">Оцените свое
                            пребывание здесь
                        </div>


                        <div className="comment-form__rating rating rating_set">
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
                            <div className="rating__text">{ratingsNames[rating-1].toUpperCase()}</div>

                        </div>
                        <div className="comment-form__title">Напишите отзыв</div>
                        <div className="comment-form__block">

                            <textarea value={text} onChange={handleTextChange} name="" id="" className="comment-form__textarea"
                                      placeholder={rating ? `Вы оценили этого объекта на ${rating} балла из 5, почему? Расскажите, пожалуйста, подробнее.` : ' Расскажите, пожалуйста, подробнее.'}></textarea>
                            <div className="comment-form__info">Осталось символов {symbols}/100</div>
                        </div>
                        <div className="comment-form__label">
                            <label htmlFor="inp1">
                                <div className="comment-form__icon"><img src={icon} alt=""/></div>
                                Прикрепите фото с Вашего визита
                            </label>
                            <input type="file" name="" id="inp1"/>
                        </div>
                        <span className={'error'}>{error}</span>
                        <button onClick={handleRateSpace} className="comment-form__button button">Отправить</button>
                    </form>
                </div>
            </div>
        </section>


);
};

export default RateForm;
