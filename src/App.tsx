import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import './App.css';
import { Event } from './Event';
import EventComponent from './EventComponent';
import { useImmer } from "use-immer";
import { cloneDeep } from 'lodash';

function App() {
  function addEvent() {
    setEventList([...eventList, new Event()])
  }
  function onEventChange(event: Event) {
    setEventList((data) => {
      data[data.indexOf(event)] = cloneDeep(event)
      return data
    })
  }
  function onDeleteEvent(event: Event) {
    setEventList((data) => {
      data.splice(data.indexOf(event), 1)
      return data
    })
  }
  const [eventList, setEventList] = useImmer(new Array<Event>())

  let eventListHtml = eventList.map((e, i) =>
    <EventComponent key={i} event={e} onEventChange={onEventChange} onDeleteEvent={onDeleteEvent} />
  )

  return (
    <>
      <CssBaseline />
      <Container>
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h1">Countdown</Typography>
          <Button onClick={addEvent} variant="outlined">Add Event</Button>
          <Grid container spacing={2} >
            {eventListHtml}
          </Grid>
        </Stack>
      </Container>
    </>
  );
}

export default App;
