import React, {useState} from 'react';
import logo from '../assets/img/logo.svg'
const Header = () => {
    const [isSideMenu,setIsSideMenu] = useState(false)
    const handleToggleSideMenu = ()=>{
        if(isSideMenu) 	document.documentElement.classList.remove("menu-open");
        else document.documentElement.classList.add("menu-open");
        setIsSideMenu(prev=>!prev)

    }
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__body">

                    <div className="header__info">
                        <a href="" className="header__logo">
                            <img src={logo} alt=""/>
                        </a>
                        <div className="header__breadcrumbs breadcrumbs">
                            <ul className="breadcrumbs__list">
                                <li className="breadcrumbs__item"><a href="" className="breadcrumbs__link">главная</a>
                                </li>
                                <li className="breadcrumbs__item"><span className="breadcrumbs__current">рейтинги</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="header__menu menu">
                        <nav className="menu__body">
                            <ul className="menu__list">
                                <li className="menu__item"><a href="" className="menu__link active">Рейтинги</a></li>
                                <li className="menu__item"><a href="" className="menu__link">Сообщество</a></li>
                                <li className="menu__item"><a href="" className="menu__link">Обзоры</a></li>
                                <li className="menu__item"><a href="" className="menu__link">ОТДЕЛ ЗАБОТЫ</a></li>
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
                        <div className="actions-header__item"><a href="#"
                                                                 className="actions-header__link _icon-user"></a></div>
                        <div className="actions-header__item"><a href="#"
                                                                 className="actions-header__link _icon-favorite active">(2)</a>
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
