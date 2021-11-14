import React from 'react'

import {Typography, CardContent} from '@mui/material'


const Album = ({name, images, artists}) => {

  return (
    <CardContent align='center'>

      <img src={images[1].url} alt={name}/>
            
      <Typography variant='h6'>{name}</Typography>
      
      <Typography>{artists[0].name}</Typography>
      

    </CardContent>
  );
}

export default Album
