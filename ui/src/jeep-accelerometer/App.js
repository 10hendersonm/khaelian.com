import React, { useEffect, useState } from 'react'

const App = () => {
  const [data, setData] = useState('No data yet')
  const handleDeviceMotion = e => {
    const dataStr = JSON.stringify(e)
    setData(dataStr)
  }
  useEffect(() => {
    window.addEventListener('deviceorientation', handleDeviceMotion, true)
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceMotion, true)
    }
  }, [])
  return <div>{data}</div>
}
export default App
