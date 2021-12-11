import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import EventComponent from './EventComponent';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <EventComponent />
      </Container>
    </>
  );
}

export default App;
