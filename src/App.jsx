import './App.css'
import Home from "./pages/Home.jsx";
import Place from "./pages/Place.jsx";
import './assets/scss/style.scss'
import {Route, Routes} from "react-router";
import Layout from "./components/Layout.jsx";
import TelegramRequire from "./components/TelegramRequire.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
function App() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route element={<TelegramRequire/>}>
                    <Route path={'/profile'} element={<Profile/>}/>
                </Route>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/place/:id'} element={<Place/>}/>
            </Route>
        </Routes>
    )
}

export default App
