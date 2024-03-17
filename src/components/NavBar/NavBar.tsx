import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import TimelapseIcon from '@mui/icons-material/Timelapse'
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  onIconClick: (state: boolean) => void;
}

const Navbar = ({onIconClick} : Props) => {
    function handleTimerClick() {
      onIconClick(true)
    }

    function handleSettingsClick() {
      onIconClick(false)
    }

    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="timer" onClick={handleTimerClick}>
              <TimelapseIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1}} align='center'>
              Life Timer
            </Typography>
            <IconButton edge="end" color="inherit" aria-label="settings" onClick={handleSettingsClick}>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </>
    );
};

export default Navbar;
