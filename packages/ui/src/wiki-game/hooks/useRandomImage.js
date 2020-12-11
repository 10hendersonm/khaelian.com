import { useState, useEffect } from 'react'
import axios from 'axios'

const useRandomImage = successful => {
  const [imageUrl, setImageUrl] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/image?correct=${successful}`)
        setImageUrl(data)
      } catch {}
    }
    fetchData()
  }, [successful])
  return imageUrl
}

export default useRandomImage
