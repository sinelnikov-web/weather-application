import React, {useState} from 'react';
import component from "./Weather.module.scss"
import Input from "../../ui/Input";
import {Slide, Slider} from "../../components/Slider";
import Loader from "../../ui/Loader";
import WeatherModal from "../../components/WeatherModal";
import {getUser, updateFavourites} from "../../components/database/database";
import {useNotification} from "../../hooks/useNotification";
import Notification from "../../ui/Notification";

const Weather = () => {

    let curUser = localStorage.getItem('authenticatedUser')
    let user = getUser(curUser)

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [currentWeather, setCurrentWeather] = useState(null)

    let [currentUser, setCurrentUser] = useState(user)

    const {
        showNotification,
        onClose,
        notifications
    } = useNotification()

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleClickSlide = (weather) => {
        setCurrentWeather(weather)
        setShowModal(true)
    }

    const handleSetFavourite = (name, event) => {
        event.stopPropagation()
        setLoading(true)
        setTimeout(() => {
            let favourites = updateFavourites(currentUser.email, name)
            if (favourites.length > currentUser.favourites.length) {
                showNotification('Add to favourite success!', 'success', 900000)
            } else {
                showNotification('Delete from favourite success! Delete from favourite success! Delete from favourite success! Delete from favourite success!', 'info', 3000)
            }
            setCurrentUser(prev => ({...prev, favourites: favourites}))
            setLoading(false)
        }, 1000)
    }

    return (
        <section className={component.weather}>
            <div className={component['weather__search-block']}>
                <div className={component['weather__search-head']}>
                    <h1 className={component.weather__title}>Location</h1>
                    <p className={component.weather__description}>
                        Find the area or city that you want to know the detailed weather info at this time
                    </p>
                    <Input
                        name={'city'}
                        placeholder={'Type city name'}
                        cls={component.weather__search}
                        icon={'search'}
                        type={'text'}
                        onChange={handleSearch}
                        value={search}
                        padding={[10, 10, 10, 30]}
                    />
                </div>
                <div className={component['weather__search-result']}>
                    {search && <Slide onClick={handleClickSlide} setFavourite={handleSetFavourite} debounced cityName={search}
                                      favourites={currentUser.favourites} active/>}
                </div>
            </div>
            <hr/>
            <h1 className={component.weather__title}>Favourites</h1>
            <Slider currentUser={currentUser} setFavourite={handleSetFavourite} onSlideClick={handleClickSlide}/>
            {loading && <Loader/>}
            {(showModal && currentWeather) &&
            <WeatherModal currentWeather={currentWeather} setShowModal={setShowModal}/>}
            {notifications.map((notification) => {
                return(
                    <Notification key={notification.id} onClose={onClose} {...notification}/>
                )
            })}
        </section>
    );
};

export default Weather;