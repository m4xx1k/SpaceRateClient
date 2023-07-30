import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";

import {Provider} from "react-redux";
import {store} from './redux/store'
import {NavigationProvider} from "./components/NavigationProvider";

const loader = document.querySelector(".preloader__wrapper");
const root = document.querySelector("#root")

const hideLoader = () => {
    document.body.classList.add("loader-hidden");
    document.getElementById("root").classList.add("visible");
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <NavigationProvider>
                    <App hideLoader={hideLoader}/>
                </NavigationProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
