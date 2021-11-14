import React from 'react';

import {Typography, Container, Button, Paper, List, ListItem, IconButton} from '@mui/material'
import {PlayArrow} from '@mui/icons-material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import Track from '../components/Track'
import Navbar from '../components/Navbar'
import Player from '../components/Player'

const Tracks = props => {

  const scopes = ['streaming', 'user-read-email', 'user-read-private', 'user-read-playback-state', 'user-modify-playback-state']
  const scopeParams = scopes.join('%20');

  const AUTH_URL = `http://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=token&scope=${scopeParams}&show_dialogue=true`;

  const playTrack = track => {

    // false = client credentials, true = implicit grant
    if (props.tokenType) {
      console.log('user logged in, able to play track')

      // need to set state of currently playing here
      props.setCurrent(track)

    } else {
      const redirectPrompt = window.confirm('To play a track, you must be logged into Spotify. Would you like to be redirected to the Spotify login page?');

      if (redirectPrompt) {
        window.location = AUTH_URL
      } 
    }
  }


  return (
    <>
      <Navbar />
      <Container align='left'>
        <Button my={2} variant='outlined' startIcon={<ArrowBackIosNewIcon />} onClick={() => window.history.back()}>back to albums</Button>
      </Container>
      
      <Container align='center' onLoad={() => props.getTracks(props.albumInfo.id)}>
        {console.log(props.albumInfo.name)}
        {console.log(props.tracks)}
        
        <Typography variant='h4'>{props.albumInfo.name}</Typography>

        <Paper align='center'><img src={props.albumInfo.imageUrl} alt={props.albumInfo.name}/></Paper>

        {/* container to display web player */}
        <Container align='center'>
          <Player accessToken={props.token} trackUri={props.current?.uri} />
        </Container>

        <List>
          {props.tracks.listOfTracks.map((track) => 
            <ListItem
              divider
              key={track.uri}
              secondaryAction={
                <IconButton edge='end' onClick={() => playTrack(track)}>
                  <PlayArrow />
                </IconButton>
              }
            >
              <Track {...track} />
            </ListItem>
          )}
        </List>
        
      </Container>
    </>
  )
}

export default Tracks;