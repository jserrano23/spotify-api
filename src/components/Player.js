import React, {useState, useEffect} from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

const Player = ({accessToken, trackUri}) => {
  // toggle immediate playback on selection
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri]);

  // do not display player if there is no valid accessToken
  if(!accessToken) return null
  
  return (
    <SpotifyPlayer
      token={accessToken}
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  )
}

export default Player
