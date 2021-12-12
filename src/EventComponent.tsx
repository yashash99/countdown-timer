import { Button, Card, CardActions, CardContent, Grid, Icon, Stack, TextField, Typography } from '@mui/material'
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { Event } from './Event'
import { Timer } from './timer'

interface Props {
    event: Event,
    onEventChange: (event: Event) => void,
    onDeleteEvent: (event: Event) => void
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

        if (props.event.eventDateTime.diffNow().milliseconds < 0) {
            stopCountdown()
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

        if (props.event.eventDateTime.diffNow().milliseconds < 0)
            stopCountdown()

        props.onEventChange(props.event)
    }
    function completedEvent() {
        console.log(props.event.eventName + " completed")
    }
    function startCountdown() {
        function callback() {
            const dateDiff = props.event.eventDateTime.diffNow(['years', 'months', 'days', 'hours', 'minutes', 'seconds'])
            let eventCompleted = false;
            let countdown = "";
            if (dateDiff.years > 0) {
                countdown += dateDiff.years.toFixed(0) + " years "
                eventCompleted = false;
            } else {
                eventCompleted = true;
            }
            if (dateDiff.months > 0) {
                countdown += dateDiff.months.toFixed(0) + " months "
                eventCompleted = false;
            } else {
                eventCompleted = true;
            }
            if (dateDiff.days > 0) {
                countdown += dateDiff.days.toFixed(0) + " days "
                eventCompleted = false;
            } else {
                eventCompleted = true;
            }
            if (dateDiff.hours > 0) {
                countdown += dateDiff.hours.toFixed(0) + " hours "
                eventCompleted = false;
            } else {
                eventCompleted = true;
            }
            if (dateDiff.minutes > 0) {
                countdown += dateDiff.minutes.toFixed(0) + " minutes "
                eventCompleted = false;
            } else {
                eventCompleted = true;
            }
            if (dateDiff.seconds > 0) {
                countdown += dateDiff.seconds.toFixed(0) + " seconds "
                eventCompleted = false;
            } else {
                eventCompleted = true;
            }

            if (eventCompleted) {
                stopCountdown()
                completedEvent()
            }


            setCountDown(countdown)
        }

        timer.set(callback, 1000)
        if (props.event.eventTime !== "" || props.event.eventDate !== "") {
            setIsExpanded(true)
            setIsStarted(true)
            timer.start()
        }


    }
    function stopCountdown() {
        setIsStarted(false)
        setIsExpanded(false)
        timer.stop()
        setCountDown("")
    }

    const [countDown, setCountDown] = useState("")

    const [isStarted, setIsStarted] = useState(false)
    const [timer,] = useState(new Timer())

    const [isExpanded, setIsExpanded] = useState(false)

    let eventButton;

    if (isStarted) {
        eventButton = <Button onClick={stopCountdown}><Icon>stop</Icon></Button>
    } else {
        eventButton = <Button onClick={startCountdown}><Icon>play_arrow</Icon></Button>
    }

    let countDownHtml;
    if (countDown !== "") {
        if (isExpanded)
            countDownHtml = <Typography sx={{ fontSize: 40, fontWeight: "bold" }}>{countDown} left</Typography>
        else
            countDownHtml = <Typography sx={{ fontWeight: "bold" }}>{countDown} left</Typography>
    }

    let expandHtml;
    if (!isExpanded) {
        expandHtml = <Button sx={{ marginLeft: 'auto' }} onClick={() => { setIsExpanded(true); }}><Icon>open_in_full</Icon></Button>
    } else {
        expandHtml = <Button sx={{ marginLeft: 'auto' }} onClick={() => { setIsExpanded(false); }}><Icon>close_fullscreen</Icon></Button>
    }

    let fieldsHtml = <>
        <TextField value={props.event.eventName} onChange={validateEventName} placeholder="Enter Event Name" />
        <Stack direction="row" spacing={2} alignItems="center">
            <TextField value={props.event.eventDate} onChange={validateDate} type="date" />
            <TextField value={props.event.eventTime} onChange={validateTime} type="time" />
        </Stack>
    </>


    let expandedHtml;

    if (isExpanded) {
        expandedHtml = <Stack spacing={2}>
            {countDownHtml}
            {props.event.eventName !== "" && < Typography sx={{ fontSize: 40, fontWeight: "bold" }}>to {props.event.eventName}</Typography>}
        </Stack >
    } else {
        expandedHtml = <Stack spacing={2}>
            {fieldsHtml}
            {countDownHtml}
        </Stack>
    }

    return (
        <Grid item>
            <Card sx={{ maxWidth: 400 }}>
                <CardContent>
                    {expandedHtml}
                </CardContent>
                <CardActions disableSpacing>
                    {(props.event.eventDate !== "" || props.event.eventTime !== "") && props.event.eventDateTime.diffNow().milliseconds > 0 && !isExpanded && eventButton}
                    {<Button onClick={() => props.onDeleteEvent(props.event)}><Icon>delete</Icon></Button>}
                    {(props.event.eventDate !== "" || props.event.eventTime !== "") && isStarted && expandHtml}
                </CardActions>
            </Card>
        </Grid>
    )
}

export default EventComponent
