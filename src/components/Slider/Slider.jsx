import React, {useEffect, useState} from 'react';
import component from './Slider.module.scss'
import Slide from "./Slide";
import {useSwipe} from "../../hooks/useSwipe";

const Slider = ({currentUser, setFavourite, onSlideClick}) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [favouriteCities, setFavouriteCities] = useState([])

    const nextSlide = () => {
        setCurrentSlide(prev => prev + 1 > currentUser.favourites.length - 1 ? 0 : prev + 1)
    }

    const prevSlide = () => {
        setCurrentSlide(prev => prev - 1 < 0 ? currentUser.favourites.length - 1 : prev - 1)
    }

    const {
        onTouchStart,
        onTouchMove,
        onTouchEnd
    } = useSwipe(prevSlide, nextSlide)

    useEffect(() => {
        if (currentUser) {
            setFavouriteCities(currentUser.favourites)
        }
    }, [currentUser])

    useEffect(() => {
        if (checkEmptySpace()) {
            prevSlide()
        }
    }, [favouriteCities])

    const checkEmptySpace = () => {
        return (currentSlide > currentUser.favourites.length - 1) && currentUser.favourites.length
    }

    return (
        <div className={component.slider}>
            <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className={component.slider__line}
                style={{transform: `translateX(${60 * -currentSlide + 20}%)`}}
            >
                {favouriteCities?.map((city, index) => {
                    return (
                        <Slide
                            onClick={onSlideClick}
                            active={index === currentSlide}
                            key={city}
                            setFavourite={setFavourite}
                            cityName={city}
                            debounced={false}
                            favourites={favouriteCities}
                        />
                    )
                })}
            </div>
            <div onClick={prevSlide} className={component.slider__left}>
                <span className={`${component.slider__arrow} ${component['slider__arrow--left']}`}/>
            </div>
            <div onClick={nextSlide} className={component.slider__right}>
                <span className={`${component.slider__arrow} ${component['slider__arrow--right']}`}/>
            </div>
            <div className={component.slider__dots}>
                {favouriteCities?.map((city, index) => {
                    return (
                        <div key={city} onClick={() => setCurrentSlide(index)}
                             className={`${component.slider__dot} ${index === currentSlide ? component.active : ''}`}/>
                    )
                })}
            </div>
        </div>
    );
};

export default Slider;