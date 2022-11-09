import React, { useEffect, useState } from 'react'

function App() {

  const [backendData, setBackendData] = useState({})

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      
      {(typeof backendData.test === "undefined") ? (
        <p>Loading...</p>
      ): (
        <p>{backendData.test}</p>
      )}

    </div>
  )
}

export default App