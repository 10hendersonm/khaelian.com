import { useEffect } from 'react'

const useWakelock = () => {
  const createWakeLockRequest = async () => {
    const wakeLockObj = await getWakeLockObject()
    if (wakeLockObj) {
      const wakeLockRequest = wakeLockObj.createRequest()
      return wakeLockRequest
    }
  }

  const getWakeLockObject = async () => {
    let wakeLockObj
    if ('getWakeLock' in navigator) {
      try {
        wakeLockObj = await navigator.getWakeLock('screen')
      } catch (err) {
        console.log('error creating wakelock', err)
      }
    } else {
      console.log('wake lock not available')
    }
    return wakeLockObj
  }

  useEffect(() => {
    var wakeLockRequest
    createWakeLockRequest().then(req => {
      wakeLockRequest = req
    })
    return () => {
      if (wakeLockRequest) {
        wakeLockRequest.cancel()
      }
    }
  }, [])
}

export default useWakelock
