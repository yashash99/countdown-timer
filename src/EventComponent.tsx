import { Button, Card, CardActions, CardContent, Grid, Stack, TextField, Typography } from '@mui/material'
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { Event } from './Event'
import { Timer } from './timer'

interface Props {
    event: Event,
    onEventChange: (event: Event) => void
}

function EventComponent(props: Props) {
    function validateEventName(e: any) {
        const _eventName = e.target.value
        props.event.eventName = _eventName
        props.onEventChange(props.event)
    }
    function validateDate(e: any) {
        let _eventDate = e.target.value
        props.event.eventDate = _eventDate


        if (_eventDate === "") {
            _eventDate = DateTime.now().toISODate()
            stopCountdown()
        }

        if (props.event.eventTime === "") {
            props.event.eventDateTime = DateTime.fromJSDate(new Date((_eventDate + " 00:00:00").trim()))
        } else {
            props.event.eventDateTime = DateTime.fromJSDate(new Date((_eventDate + " " + props.event.eventDateTime.toISOTime({ suppressSeconds: true, suppressMilliseconds: true, format: 'extended', includeOffset: false })).trim()))
        }
        props.onEventChange(props.event)

    }
    function validateTime(e: any) {
        const _eventTime = e.target.value

        props.event.eventTime = _eventTime

        if (_eventTime === "") {
            stopCountdown()
        }
        props.event.eventDateTime = DateTime.fromJSDate(new Date((props.event.eventDateTime.toISODate() + " " + _eventTime).trim()))

        props.onEventChange(props.event)
    }
    function startCountdown() {

        function callback() {
            const dateDiff = props.event.eventDateTime.diffNow(['years', 'months', 'days', 'hours', 'minutes', 'seconds'], { conversionAccuracy: 'casual' })

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
        if (props.event.eventTime !== "" || props.event.eventDate !== "") {
            setIsStarted(true)
            timer.start()
        }


    }
    function stopCountdown() {
        setIsStarted(false)
        timer.stop()
        setCountDown("")
    }

    const [countDown, setCountDown] = useState("")

    const [isStarted, setIsStarted] = useState(false)
    const [timer,] = useState(new Timer())

    let eventButton;

    if (isStarted) {
        eventButton = <Button onClick={stopCountdown}>Stop</Button>
    } else {
        eventButton = <Button onClick={startCountdown}>Start</Button>
    }

    let countDownHtml;
    if (countDown !== "")
        countDownHtml = <Typography>{countDown}</Typography>
    return (
        <Grid item>
            <Card sx={{ maxWidth: 400 }}>
                <CardContent>
                    <Stack spacing={2}>
                        <TextField value={props.event.eventName} onChange={validateEventName} placeholder="Enter Event Name" />
                        <Stack direction="row" spacing={2} alignItems="center">
                            <TextField value={props.event.eventDate} onChange={validateDate} type="date" />
                            <TextField value={props.event.eventTime} onChange={validateTime} type="time" />
                        </Stack>
                        {countDownHtml}

                    </Stack>
                </CardContent>
                <CardActions>
                    {eventButton}
                </CardActions>
            </Card>
        </Grid>
    )
}

export default EventComponent
