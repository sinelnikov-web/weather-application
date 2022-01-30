import {useState} from "react";
import uuid from "react-uuid";


export function useNotification() {
    const [notifications, setNotifications] = useState([])

    const showNotification = (message, type, time=3000) => {
        const notification = {
            id: uuid(),
            message: message,
            type: type,
            time: time
        }
        setNotifications(prev => [...prev, notification])
    }
    const onClose = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id))
    }

    return {
        showNotification,
        onClose,
        notifications
    }
}