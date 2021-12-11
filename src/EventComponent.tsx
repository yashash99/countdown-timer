import { Button, Card, CardActions, CardContent, Stack, TextField, Typography } from '@mui/material'
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { Timer } from './timer'

function EventComponent() {
    function validateEventName(e: any) {
        const _eventName = e.target.value
        setEventName(_eventName)
    }
    function validateDate(e: any) {
        let _eventDate = e.target.value
        setEventDate(_eventDate)

        if (_eventDate === "") {
            _eventDate = DateTime.now().toISODate()
            stopCountdown()
        }

        if (eventTime === "") {
            setEventDateTime(DateTime.fromJSDate(new Date((_eventDate + " 00:00:00").trim())))
        } else {
            setEventDateTime(DateTime.fromJSDate(new Date((_eventDate + " " + eventDateTime.toISOTime({ suppressSeconds: true, suppressMilliseconds: true, format: 'extended', includeOffset: false })).trim())))
        }

    }
    function validateTime(e: any) {
        const _eventTime = e.target.value
        if (_eventTime === "") {
            stopCountdown()
        }
        setEventTime(_eventTime)
        setEventDateTime(DateTime.fromJSDate(new Date((eventDateTime.toISODate() + " " + _eventTime).trim())))
    }
    function startCountdown() {

        function callback() {
            const dateDiff = eventDateTime.diffNow(['years', 'months', 'days', 'hours', 'minutes', 'seconds'], { conversionAccuracy: 'casual' })

            let countdown = "";
            if (dateDiff.years > 0) {
                countdown += dateDiff.years.toFixed(0) + " years "
            }
            if (dateDiff.months > 0) {
                countdown += dateDiff.months.toFixed(0) + " months "
            }
            if (dateDiff.days > 0) {
                countdown += dateDiff.days.toFixed(0) + " days "
            }
            if (dateDiff.hours > 0) {
                countdown += dateDiff.hours.toFixed(0) + " hours "
            }
            if (dateDiff.minutes > 0) {
                countdown += dateDiff.minutes.toFixed(0) + " minutes "
            }
            if (dateDiff.seconds > 0) {
                countdown += dateDiff.seconds.toFixed(0) + " secconds "
            }

            setCountDown(countdown)
        }

        timer.set(callback, 1000)
        if (eventTime !== "" || eventDate !== "") {
            setIsStarted(true)
            timer.start()
        }


    }
    function stopCountdown() {
        setIsStarted(false)
        timer.stop()
        setCountDown("")
    }
    const [eventName, setEventName] = useState("")
    let date = DateTime.now()
    date = date.set({ second: 0, millisecond: 0 })
    const [eventDateTime, setEventDateTime] = useState(date)
    const [countDown, setCountDown] = useState("")

    const [eventDate, setEventDate] = useState("")
    const [eventTime, setEventTime] = useState("")

    const [isStarted, setIsStarted] = useState(false)
    const [timer,] = useState(new Timer())

    let eventButton;

    if (isStarted) {
        eventButton = <Button onClick={stopCountdown}>Stop</Button>
    } else {
        eventButton = <Button onClick={startCountdown}>Start</Button>
    }

    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardContent>
                <Stack spacing={2}>
                    <TextField value={eventName} onChange={validateEventName} placeholder="Enter Event Name" />
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TextField value={eventDate} onChange={validateDate} type="date" />
                        <TextField value={eventTime} onChange={validateTime} type="time" />
                    </Stack>
                    <Typography>{countDown}</Typography>

                </Stack>
            </CardContent>
            <CardActions>
                {eventButton}
            </CardActions>
        </Card>
    )
}

export default EventComponent
