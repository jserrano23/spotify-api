import React, {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import axios from 'axios';

import Home from './pages/Home'
import Tracks from './pages/Tracks'

const App = () => {

  const getSpotifyAuthResponse = hash => {
    const response = hash.substring(1);
    const params = response.split('&');
    const requestValues = params.reduce((acc, val) => {
      const [key, value] = val.split('=');
      acc[key] = value;
      return acc;
    }, {});

    return requestValues;
  }

  console.log('Rendering App.js on port 3000');

  const tokenUri = 'https://accounts.spotify.com/api/token';
  const baseUri = 'https://api.spotify.com/v1';

  const [token, setToken] = useState('')
  const [tokenType, setTokenType] = useState(false)    // false = client credentials, true = implicit grant
  const [expiresIn, setExpiresIn] = useState('')
  const [albums, setAlbums] = useState({listOfAlbums: []})
  const [albumInfo, setAlbumInfo] = useState({name: '', imageUrl: '', id: ''})
  const [tracks, setTracks] = useState({listOfTracks: []})
  const [currentlyPlaying, setCurrentlyPlaying] = useState()


  useEffect(() => {

    // if statement to handle the two different authorization methods
    //   - if hash is found in location -> implicit grant authorization
    //   - else -> client credentials authorization
    if(window.location.hash) {
      console.log('hash found, implementing implicit grant auth')
      
      const res = getSpotifyAuthResponse(window.location.hash);
      console.log('token: ' + res.access_token)
      
      setToken(res.access_token);
      setTokenType(true);
      setExpiresIn(res.expires_in);

      console.log('token expires in: ' + expiresIn + ' seconds')

      console.log('implicit grant authorization success');

      getNewlyReleased(res.access_token);

    } else {
      console.log('no hash found, implementing client credentials auth')

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
        setTokenType(false);

        console.log('client credentials authorization success');

        getNewlyReleased(tokenRes.data.access_token);
        
      })
    }
  }, [expiresIn]);


  
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

  // getting api data of newly released tracks
  const getAlbumTracks = val => {
    axios(baseUri + `/albums/${val}/tracks`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
    .then(tracksRes => {
      setAlbumInfo({
        name: albumInfo.name,
        imageUrl: albumInfo.imageUrl,
        id: val,
      });

      setTracks({
        listOfTracks: tracksRes.data.items
      })
      console.log('retrieved tracks list')
      console.log(tracksRes.data.items)
    })
  }

 
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home albums={albums} setAlbumInfo={setAlbumInfo} tokenType={tokenType} />} />

        {/* need to display specific route based on token type */}
        {tokenType
          ? <Route path='/tracksplayer' element={<Tracks albumInfo={albumInfo} tracks={tracks} getTracks={getAlbumTracks} token={token} tokenType={tokenType} setCurrent={setCurrentlyPlaying} current={currentlyPlaying} />} />
          : <Route path='/tracks' element={<Tracks albumInfo={albumInfo} tracks={tracks} getTracks={getAlbumTracks} token={token} tokenType={tokenType} setCurrent={setCurrentlyPlaying} current={currentlyPlaying} />} />
        }
        
      </Routes>
    </div>
  );
}

export default App;
