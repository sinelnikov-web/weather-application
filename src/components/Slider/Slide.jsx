import React, {Fragment, useEffect, useState} from 'react';
import component from "./Slider.module.scss";
import Icon from "../../ui/Icon";
import {Weather as WeatherAPI} from "../../api/weather";
import {Image} from "../../api/image";
import {useDebounce} from "../../hooks/useDebounce";
import Loader from "../../ui/Loader";

const Slide = ({setFavourite, cityName, debounced, favourites, active, onClick}) => {

    const [city, setCity] = useState(null)
    const [weather, setWeather] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    const fetchQuery = (query) => {
        setIsFetching(true)
        WeatherAPI.getWeather(query).then(data => {
            if (data) {
                Image.getImage(data.name).then(res => {
                    let cityObject = {
                        id: data.id,
                        name: data.name,
                        temperature: +(data.main.temp - 273.15).toFixed(1),
                        image: res?.urls.small || '',
                        favourite: false
                    }
                    setCity(cityObject)
                    setWeather(data)
                })
            }
        }).finally(() => setIsFetching(false))
    }

    const debouncedFetchQuery = useDebounce(() => fetchQuery(cityName), 1000)

    useEffect(() => {
        if (debounced) {
            debouncedFetchQuery()
        } else {
            fetchQuery(cityName)
        }
    }, [cityName])

    return (
        <Fragment>
            {(city && weather) && <div onClick={() => onClick(weather)}
                                       className={`${component.slider__slide} ${component.slide} ${active ? component.active : ''}`}>
                <div className={component.slide__info} style={{backgroundImage: `url("${city.image}")`}}>
                    <div className={component.slide__inner}>
                        <h2 className={component.slide__title}>{city.name}</h2>
                        <span className={component.slide__temperature}>{city.temperature}°C</span>
                        <div onClick={(e) => setFavourite(city.name, e)} className={component.slide__favourite}>
                            <Icon name={favourites.includes(city.name) ? 'star-active' : 'star-disabled'}/>
                        </div>
                    </div>
                </div>
            </div>}
            {isFetching && <Loader/>}
        </Fragment>
    );
};

export default Slide;