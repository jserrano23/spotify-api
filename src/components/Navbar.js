import React from 'react'

import {Typography, AppBar, Toolbar} from '@mui/material'

const Navbar = () => {
  return (
    <AppBar position='relative'>
      <Toolbar>
        <Typography>Spotify API App</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
