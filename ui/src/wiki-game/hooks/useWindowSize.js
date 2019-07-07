import React, { useState, useEffect } from 'react'

const createWindowSize = (height, width) => ({
  height,
  width,
})
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(createWindowSize())
  useEffect(() => {
    const handleResize = e => {
      const win = e.target
      const { innerHeight, innerWidth } = win
      setWindowSize(createWindowSize(innerHeight, innerWidth))
    }
    window.addEventListener('resize', handleResize)
    handleResize({ target: window }) // set initial size
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return windowSize
}

export default useWindowSize
