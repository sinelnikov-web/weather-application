import React, {useState} from 'react';
import {Login, Register} from "../../components/auth";
import component from "./Auth.module.scss"

const Auth = () => {

    const [currentView, setCurrentView] = useState('login')


    const renderView = () => {
        switch (currentView) {
            case 'login': {
                return <Login setView={setCurrentView}/>
            }
            case 'register': {
                return <Register setView={setCurrentView}/>
            }
        }
    }

    return (
        <section className={component.auth}>
            {renderView()}
        </section>
    );
}

export default Auth;