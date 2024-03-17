import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider  } from '@mui/x-date-pickers'
import dayjs from 'dayjs';

import { AgeStorage, getStoredAge, setStoredAge } from '../../utils/storage';

interface Props {
  onSaveButton: (state: boolean) => void;
}

const Settings = ( {onSaveButton} : Props ) => {
  const [ageInput, setAgeInput] = useState<AgeStorage | null>(null)

  useEffect(() => {
    getStoredAge().then((data) => {
      setAgeInput(data)
    })
  }, [])

  function handleButtonClick() {
    console.log("Settings::handleButtonClick(): " + ageInput.dateOfBirth + " " + ageInput.desiredAge)
    setStoredAge(ageInput).then(() => {
      onSaveButton(true)
    })
  }

  return (
    <>
      <h1>Settings</h1>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              label='Date of birth'
              disableFuture={true}
              onChange={(date) => setAgeInput({...ageInput, dateOfBirth: date.toDate().getTime()})}
              value={dayjs(ageInput?.dateOfBirth)} 
            />
        </LocalizationProvider>
        <TextField
          label='Desired age'
          type='number'
          onChange={(e) => setAgeInput({...ageInput, desiredAge: parseInt(e.target.value)})}
          variant="outlined"
          value={ageInput?.desiredAge || ''}
        />
        <br />
        <Button
          variant='contained'
          color='primary'
          onClick={handleButtonClick}
        >
          Save
        </Button>
      </div>
    </>
  ); 
};

export default Settings;
