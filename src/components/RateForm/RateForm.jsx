import React, {useEffect, useState} from 'react';
import s from './RateForm.module.scss'
import ReactStars from "react-rating-stars-component/dist/react-stars.js";
import {useTelegram} from "../../hooks/useTelegram.js";
import {useFindUserPlaceRatingMutation, useRatePlaceMutation} from "../../redux/place/place.api.js";

const RateForm = ({placeId}) => {
    const {user, tg} = useTelegram()
    const [rating, setRating] = useState(0)
    const [text, setText]  = useState('')
    const [error, setError] = useState('')
    const [isShow, setIsShow] = useState(false)
    const [findUserRating] = useFindUserPlaceRatingMutation()
    const [ratePlace] = useRatePlaceMutation()
    useEffect(() => {

        // const fetchdata = async () => {
        //     const {data} = await findUserRating({placeId, telegramId: user.id})
        //     // if (data) setRating(data?.value)
        // }
        // if (user) fetchdata()
        tg.ready()

    }, [])
    const ratingChanged = (newRating) => {
        if(!user){
            window.location.replace('https://t.me/spaceratebot')
            return
        }
        setIsShow(true);
        setRating(newRating);
    };
    const handleRateSpace = async () => {
        if (text && rating) {
            const res = await ratePlace({telegramId: user.id, value: rating, placeId, text})
            setIsShow(false)
        }else{
            setError('Заполните рейтинг и текст')
        }
    }
    return (
        <>
            <div className="restaurant__hide">
                <button onClick={() => setIsShow(true)} className="rewievs__btn _icon-comment">
                    <span>ОСТАВИТЬ ОТЗЫВ</span></button>
                <div className="rating rating_lite rating_set">
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={32}
                        activeColor="#ffd700"
                        value={rating}
                    />
                    <div className="rating__value"></div>
                </div>

            </div>
            {
                isShow ? <div className={s.form}>
                    <textarea value={text} onChange={e=>setText(e.target.value)} placeholder={'Ваш ОТЗЫВ'} className={s.textarea} name="" id="" rows="4"></textarea>
                    <span className={s.error}>{error}</span>
                    <button onClick={handleRateSpace} className={s.btn}>Отправить</button>
                </div> : <></>
            }
        </>


    );
};

export default RateForm;
