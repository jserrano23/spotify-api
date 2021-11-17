import React, {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import axios from 'axios';

import Home from './pages/Home'
import Tracks from './pages/Tracks'

const App = () => {

  console.log('Rendering App.js on port 3000');

  const tokenUri = 'https://accounts.spotify.com/api/token';
  const baseUri = 'https://api.spotify.com/v1';

  const [token, setToken] = useState('')
  const [albums, setAlbums] = useState({listOfAlbums: []})
  const [albumInfo, setAlbumInfo] = useState({name: '', imageUrl: '', id: ''})


  useEffect(() => {

    // handle client credentials authorization
    axios(tokenUri, {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then (tokenRes => {
      console.log('token: ' + tokenRes.data.access_token);
      setToken(tokenRes.data.access_token);

      console.log('client credentials authorization success');

      getNewlyReleased(tokenRes.data.access_token);
      
    })

  }, []);


  
  // getting api data of newly released albums
  const getNewlyReleased = t => {
    axios(baseUri + '/browse/new-releases', {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + t
      }
    })
    .then(albumRes => {
      setAlbums({
        listOfAlbums: albumRes.data.albums.items
      });
      
      console.log(albumRes.data.albums);
    })
    .catch(() => {
      window.location = '/';
    })
  }

 
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home albums={albums} setAlbumInfo={setAlbumInfo} />} />
        <Route path='/tracks' element={<Tracks albumInfo={albumInfo} token={token} />} />
      </Routes>
    </div>
  );
}

export default App;
