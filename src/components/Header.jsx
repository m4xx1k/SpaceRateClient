import React, { useState} from 'react';
import logo from '../assets/img/logo.svg'
import {Link} from "react-router-dom";
import {useTelegram} from "../hooks/useTelegram.js";
import {useFavouriteCountQuery} from "../redux/place/place.api.js";
import {BackButton} from "./BackButton";

const Header = () => {
    const [isSideMenu, setIsSideMenu] = useState(false)
    const {user} = useTelegram()
    //     const user = {id: '466439009'}
    const {data} = useFavouriteCountQuery(user?.id)
    const handleToggleSideMenu = () => {
        if (isSideMenu) document.documentElement.classList.remove("menu-open");
        else document.documentElement.classList.add("menu-open");
        setIsSideMenu(prev => !prev)

    }
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__body">
                    <div className="header__info">
                        <BackButton classname={'links__back-btn'}>{'⇦'}</BackButton>

                        <Link to="/" className="header__logo">
                            <img src={logo} alt=""/>
                        </Link>

                    </div>

                    <div className="header__menu menu">
                        <nav className="menu__body">
                            <ul className="menu__list">
                                <li className="menu__item"><a href="https://t.me/goodjoyuz_bot" className="menu__link active">Рейтинги</a></li>
                                <li className="menu__item"><a href="https://t.me/goodjoyuz_bot" className="menu__link">Сообщество</a></li>
                                <li className="menu__item"><a href="https://t.me/goodjoyuz_bot" className="menu__link">Обзоры</a></li>
                                <li className="menu__item"><a href="https://t.me/goodjoyuz_bot" className="menu__link">ОТДЕЛ ЗАБОТЫ</a></li>
                            </ul>
                        </nav>
                    </div>

                    <div className="header__actions actions-header">
                        <div className="actions-header__item actions-header__item_search" data-search>
                            <button className="actions-header__link _icon-search" data-search-btn></button>
                            <form action="#" className="actions-header__search-form search-form">
                                <input data-search-input autoComplete="off" type="text" name="form[]" placeholder=""
                                       className="search-form__input input"/>
                            </form>
                        </div>
                        <div className="actions-header__item"><Link to="/login"
                                                                    className="actions-header__link _icon-user"></Link>
                        </div>
                        <div className="actions-header__item"><Link to="/favourites"
                                                                 className="actions-header__link _icon-favorite active">{!!data ? data : <></>}</Link>
                        </div>
                        <button onClick={handleToggleSideMenu}
                                type="button" className="menu__icon icon-menu"><span></span></button>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
