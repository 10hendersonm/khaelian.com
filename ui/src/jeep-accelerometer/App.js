import React, { useEffect, useState } from 'react'

const App = () => {
  const [data, setData] = useState('No data yet')
  const handleDeviceMotion = e => {
    console.log(e)
    setData('data')
  }
  useEffect(() => {
    // var supportsOrientationChange = !!window.ondeviceorientation
    // if (supportsOrientationChange) {
    // setData('Has Event')
    window.addEventListener('deviceorientation', handleDeviceMotion, true)
    // } else {
    // setData('no event')
    // }
    return () => {
      setData('removing event')
      window.removeEventListener('deviceorientation', handleDeviceMotion, true)
    }
  }, [])
  return <div>{data}</div>
}
export default App
