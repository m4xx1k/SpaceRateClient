import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {
    useFindPlaceImagesQuery,
    useFindPlaceInfosQuery,
    useToggleFavouritePlaceMutation
} from "../redux/place/place.api.js";
import {toWebp} from "../utils.js";
import like from '../assets/icons/like.svg'
import liked from '../assets/icons/liked.svg'
import {useFindUserMutation} from "../redux/auth/authApiSlice.js";
import {useTelegram} from "../hooks/useTelegram.js";

const VITE__API = import.meta.env.VITE__API
const MobilePlace = ({e, i}) => {
    const id = e._id
    // const user = {id: '466439009'}
    const {user} = useTelegram()
    const {data: photos, isLoading: isLoadingPhotos, isSuccess: isSuccessPhotos} = useFindPlaceImagesQuery(id)
    const {data: info, isLoading: isLoadingInfos, isSuccess: isSuccessInfos} = useFindPlaceInfosQuery(id)
    const [isLiked, setIsLiked] = useState(!!e?.isFavourite)
    const [toggleFavourite] = useToggleFavouritePlaceMutation()
    const [findUser] = useFindUserMutation()
    const navigate = useNavigate()
    const location = info?.location?.value ? info.location.value : ''
    const type = info?.type?.value ? info.type.value : ''
    const handleToggleFavourite = async () => {
        if (!user) {
            window.location.replace('https://t.me/goodjoyuz_bot')
            return
        }
        const {data} = await findUser({telegramId: user.id})

        if (data) {
            try {
                await toggleFavourite({placeId: id, telegramId: user?.id})
                setIsLiked(prev => !prev)
            } catch (e) {
                console.log(e)
            }
        } else {
            navigate('/login')
        }

    }

    return (
        <div className="placeitem-mobile">
            <div className="placeitem-mobile__img-container">
                <Link to={`/place/${id}`}>
                    {isSuccessPhotos && <picture>
                        <source  className="placeitem-mobile__img"
                                srcSet={toWebp(`${VITE__API}/places/${photos[0]?.photo}`)}/>
                        <img loading="lazy"  className="placeitem-mobile__img" src={`${VITE__API}/places/${photos[0]?.photo}`} alt=""/>
                    </picture>}
                </Link>

                <div onClick={handleToggleFavourite} className={'placeitem-mobile__liked'}>
                    <img loading="lazy"  src={isLiked ? liked : like} alt="" className={'placeitem-mobile__liked_img'}/>
                </div>
            </div>

            <Link to={`/place/${id}`} className="placeitem-mobile__info">
                <span className={'placeitem-mobile__name'}>{e.name}</span>
                {
                    type ?
                        <div className="list-product__item _icon-kitchen placeitem-mobile_infoitem">
                            {type}
                        </div> : <></>

                }
                <span className={'placeitem-mobile__rating'}>

                        {e.rating.toFixed(1)}
                    </span>
                {
                    location ?
                        <div className="list-product__item _icon-location">
                            <div className="placeitem-mobile__location placeitem-mobile_infoitem">{location}</div>
                        </div> : <></>

                }

            </Link>
        </div>

    );
};

export default MobilePlace;
