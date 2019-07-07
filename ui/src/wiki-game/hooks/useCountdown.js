import React, { useState, useEffect } from 'react'

const useCountdown = (initialCount, countInterval = 1000) => {
  const [count, setCount] = useState(initialCount)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => {
        const newCount = prevCount - 1
        if (newCount === 0) clearInterval(interval)
        return newCount
      })
    }, countInterval)
    return () => {
      clearInterval(interval)
    }
  }, [countInterval])
  return count
}

export default useCountdown
