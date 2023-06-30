import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";

import {Provider} from "react-redux";
import {store} from './redux/store'
import {NavigationProvider} from "./components/NavigationProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <NavigationProvider>
                    <App/>
                </NavigationProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
