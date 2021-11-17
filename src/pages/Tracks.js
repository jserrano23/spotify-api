import React from 'react';

import {Container, Button} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import Navbar from '../components/Navbar'

const Tracks = props => {

  const embedSrc = `https://open.spotify.com/embed/album/${props.albumInfo.id}`

  return (
    <>
      <Navbar />
      <Container align='left'>
        <Button my={2} variant='outlined' startIcon={<ArrowBackIosNewIcon />} onClick={() => window.history.back()}>back to albums</Button>
      </Container>
      
      <Container align='center'>
        {console.log(props.albumInfo.name)}
        
        {/* generates a spotify embed from the selected album */}
        <iframe src={embedSrc} title={props.albumInfo.name} width='1200' height='800' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>
        
      </Container>
    </>
  )
}

export default Tracks;