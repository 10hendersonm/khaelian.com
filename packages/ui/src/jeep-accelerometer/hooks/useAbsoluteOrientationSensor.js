import { useEffect, useState } from 'react'

const useAbsoluteOrientationSensor = (onSensorRead, onSensorError) => {
  useEffect(() => {
    console.log(navigator)
    // const sensor = new AbsoluteOrientationSensor({
    //   referenceFrame: 'screen',
    //   frequency: 60,
    // })
    // if (onSensorRead) sensor.onreading = onSensorRead
    // if (onSensorError) sensor.onerror = onSensorError
    // sensor.start()
    // return () => {
    //   sensor.stop()
    // }
  }, [])
}

export default useAbsoluteOrientationSensor
