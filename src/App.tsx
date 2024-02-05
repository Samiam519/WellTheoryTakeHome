import React from 'react'
import {Route, Routes} from "react-router-dom";
import Home from "@routes/Home";
import Error from "@routes/Error";
import {SupportView} from "@routes/Profile";
import styles from './styles.module.scss'
import {Navigation} from "./navigation";
import {ToastContainer} from "react-toastify";
import {UserProvider} from "@providers";
import 'react-toastify/dist/ReactToastify.css';

export const App = ()=> {
    return (
        <div className={styles.mainContent}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile" element={<UserProvider/>}>
                    <Route path="/profile/support" element={<SupportView/>}/>
                </Route>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </div>
    )
}
