import {useState} from "react";

export function useSwipe(leftHandler, rightHandler) {
    const [touchData, setTouchData] = useState({
        x: 0,
        y: 0
    })
    const [touchMoveDir, setTouchMoveDir] = useState('')

    const onTouchStart = (event) => {
        const firstTouch = event.touches[0]
        setTouchData({x: firstTouch.clientX, y: firstTouch.clientY})
    }

    const onTouchMove = (event) => {
        let currentTouch = event.touches[0]
        let xDiff = currentTouch.clientX - touchData.x
        let yDiff = currentTouch.clientY - touchData.y
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                setTouchMoveDir('left')
            } else if (xDiff < 0) {
                setTouchMoveDir('right')
            }
        }
    }

    const onTouchEnd = (event) => {
        if (touchMoveDir === 'left') {
            leftHandler()
        } else if (touchMoveDir === 'right') {
            rightHandler()
        }
        setTouchMoveDir('')
    }

    return {
        onTouchEnd,
        onTouchMove,
        onTouchStart,
    }
}