import React, { useState } from 'react'

const MainContext = React.createContext()

const MainProvider = ({ children }) => {
  const [sender, setSender] = useState('')
  const [room, setRoom] = useState('')

  return (
    <MainContext.Provider value={{ sender, room, setSender, setRoom }}>
      {children}
    </MainContext.Provider>
  )
}

export { MainContext, MainProvider }
