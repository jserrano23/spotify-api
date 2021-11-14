import React from 'react'
import {Link} from 'react-router-dom'

import {Typography, Container, Card, Button} from '@mui/material'

import Album from '../components/Album'
import Navbar from '../components/Navbar'

const Home = props => {

  const setInfo = (albumName, imgUrl, albumId) => {
    
    props.setAlbumInfo({
      name: albumName,
      imageUrl: imgUrl,
      id: albumId,
    });

  } 

  return (
    <>
      <Navbar />

      <Container align='center'>
        <Typography variant='h3'>New Releases</Typography>

        {props.albums.listOfAlbums.map((album, i) => 
          
          <Card key={i}>
            <Album {...album} />
            <Button onClick={() => 
              setInfo(album.name, album.images[1].url, album.id)
            }>
              {props.tokenType
                ? <Link to='/tracksplayer'>view track list</Link>
                : <Link to='/tracks'>view track list</Link>
              }
            </Button>
          </Card>
        )}
      </Container>
    </>
  )
}

export default Home
