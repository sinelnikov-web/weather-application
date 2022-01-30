import React, {useEffect, useState} from 'react';
import component from "./Notification.module.scss"
import * as ReactDOM from "react-dom";

let notificationsRoot = document.getElementById('notifications')

const Notification = ({message, onClose, type='default', id}) => {

    const notificationTypeClasses = {
        'error': 'notification--error',
        'success': 'notification--success',
        'default': 'notification--default',
        'info': 'notification--info',
    }

    const [animationState, setAnimationState] = useState(0)
    const [close, setClose] = useState(false)
    const [progress, setProgress] = useState(100)
    const [intervalId, setIntervalId] = useState(null)
    const [stopTimer, setStopTimer] = useState(false)

    useEffect(() => {
        if (!stopTimer) {
            let interval = setInterval(() => {
                setProgress(prev => prev - 1)
            }, Math.floor(3000 / 100))
            setIntervalId(interval)
            return () => {
                clearInterval(interval)
            }
        }
    }, [stopTimer])

    useEffect(() => {
        if (progress === 0) {
            clearInterval(intervalId)
            setIntervalId(null)
            setClose(true)
        }
    }, [progress])

    useEffect(() => {
        if (animationState === 2) {
            onClose(id)
        }
    }, [animationState])

    const handleAnimationEnd = () => {
        setAnimationState(prev => prev + 1)
    }

    const handleNotificationClose = () => {
        setClose(true)
        clearInterval(intervalId)
        setIntervalId(null)
    }

    const handleNotificationMouseEnter = () => {
        setStopTimer(true)
        clearInterval(intervalId)
        setIntervalId(null)
    }

    const handleNotificationMouseLeave = () => {
        setStopTimer(false)
    }

    const handleNotificationClick = () => {
        setClose(true)
        clearInterval(intervalId)
        setIntervalId(null)
    }

    return (
        ReactDOM.createPortal(
            <div
                onMouseEnter={handleNotificationMouseEnter}
                onMouseLeave={handleNotificationMouseLeave}
                onAnimationEnd={handleAnimationEnd}
                onClick={handleNotificationClick}
                className={`${component.notification} ${component[notificationTypeClasses[type]]} ${close ? component['notification--closing'] : ''}`}
            >
                <div className={component.notification__body}>
                    {message}
                </div>
                <button onClick={handleNotificationClose} className={component.notification__close}>&times;</button>
                <div style={{width: `${progress}%`}} className={component.notification__line}/>
            </div>,
            notificationsRoot
        )
    );
};

export default Notification;