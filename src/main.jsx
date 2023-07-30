import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";

import {Provider} from "react-redux";
import {store} from './redux/store'
import {NavigationProvider} from "./components/NavigationProvider";

const loader = document.querySelector(".preloader__wrapper");
const showLoader = () => loader.classList.remove("preloader__wrapper-none");

const hideLoader = () => loader.classList.add("preloader__wrapper-none");

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <NavigationProvider>
                    <App hideLoader={hideLoader} showLoader={showLoader}/>
                </NavigationProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
