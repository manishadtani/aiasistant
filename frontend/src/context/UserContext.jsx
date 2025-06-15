import React, { createContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

export const userDataContext = createContext()

const userContext = ({ children }) => {

  const serverUrl = "http://localhost:8000"
  const [userData, setUserData] = useState(null)

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`,
        { withCredentials: true })
        setUserData(result.data),
        console.log(result.data)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    handleCurrentUser()
  },[])


  const value = {
    serverUrl
  }


  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>

  )
}

export default userContext