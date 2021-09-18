import React, {useState, useEffect} from 'react'
import { Text, Alert } from 'react-native'

const minToMillis = (min) => min * 1000 * 60;

const formatTime = time => time < 10 ? `0${time}` : time;

export default function Countdown({
    minutes = 2,
    isPaused
}) {
    const interval = React.useRef(null);
    const countDown = () => {
        setMillis((time) => {
            if(time === 0) {
                Alert.alert('ALL YOUR DATA HAS BEEN SENT', 'SEE YAA!!', [{}], { cancelable: false })
                return time;
            }
            const timeLeft = time - 1000;

            return timeLeft;
        })
    }

    useEffect(() => {
        if(isPaused){
            return;
        }
        interval.current = setInterval(countDown, 1000);

        return () => clearInterval(interval.current)
    }, [isPaused])

    const [millis, setMillis] = useState(minToMillis(minutes))
    const minute = Math.floor(millis / 1000 / 60) % 60;
    const seconds = Math.floor(millis / 1000) % 60;
    return (
            <Text style={{color: 'red', fontSize: 70}}>{formatTime(minute)}:{formatTime(seconds)}</Text>
    )
}
