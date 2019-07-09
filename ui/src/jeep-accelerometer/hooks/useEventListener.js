import React, { useEffect } from 'react'

const useEventListener = (event, handler) => {
  useEffect(() => {
    window.addEventListener(event, handler, true)
    return () => {
      window.removeEventListener(event, handler, true)
    }
  }, [event, handler])
}

export default useEventListener
