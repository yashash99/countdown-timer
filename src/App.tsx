import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';
import './App.css';
import { Event } from './Event';
import EventComponent from './EventComponent';

function App() {
  function addEvent() {
    let newList = Array.from(eventList)
    newList.push(new Event())
    setEventList(newList)
  }
  const [eventList, setEventList] = useState(new Array<Event>())

  let eventListHtml = eventList.map((e, i) =>
    <EventComponent key={i} event={e} />
  )

  return (
    <>
      <CssBaseline />
      <Container>
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h1">Events</Typography>
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
