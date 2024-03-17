import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { NavBar, Settings, Timer } from '../components'
import { AgeStorage, getStoredAge } from '../utils/storage'

import './popup.css'

const App: React.FC<{}> = () => {
  const [ageInput, setAgeInput] = useState<AgeStorage | null>(null)
  const [showTimer, setShowTimer] = useState<boolean>(false)

  useEffect(() => {
    getStoredAge().then((data) => {
      console.log("App::useEffect: " + data.dateOfBirth + " " + data.desiredAge)
      setAgeInput(data)
    })
  }, [showTimer])

  // useEffect(() => {
  //   console.log("App::useEffect::ageInput: " + ageInput?.dateOfBirth + " " + ageInput?.desiredAge)
  //   const updated = ageInput
  //   setAgeInput(updated)
  // }, [ageInput])

  function getLeftTime( ageData: AgeStorage)  {
    // console.log("App::getLeftTime(): " + ageData.dateOfBirth + " " + ageData.desiredAge)
    if (!ageData) {
      return new Date()
    }
    const { dateOfBirth, desiredAge } = ageData
    const death = new Date(dateOfBirth)
    death.setFullYear(death.getFullYear() + desiredAge)
    // console.log(death)
    const left = death.getTime() - Date.now()
    // console.log(left)
    console.log("App::getLeftTime(): " + ageData.dateOfBirth + " " + ageData.desiredAge)
    return death
  }

  return (
    <>
      <NavBar onIconClick={setShowTimer} />
      {!showTimer && <Settings onSaveButton={setShowTimer}/>}
      {<div id="timer-container"><Timer timestamp={getLeftTime(ageInput).getTime()}/></div>}
    </>
  );
};

const root = document.createElement('div')
root.id = "content-container"
document.body.appendChild(root)
ReactDOM.render(<App />, root)
