import {useState} from "react";


export function useDebounce(fn, ms) {

    const [timer, setTimer] = useState(null)

    return function (...args) {
        if (timer != null) {
            clearTimeout(timer)
            setTimer(null)
        }
        setTimer(setTimeout(() => {
            fn(args)
        }, ms))
    }
}
