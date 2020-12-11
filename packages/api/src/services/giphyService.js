import axios from 'axios'
import { randomItem } from '../utils/array'

const giphyUrl = 'http://api.giphy.com/v1/gifs'

const positiveTags = ['good work', 'you got it', 'great', 'epic']
const negativeTags = ['you suck', 'terrible', 'bad', 'kanye west']

export const getImage = good => {
  const tag = randomItem(good ? positiveTags : negativeTags)
  return getRandomImageByTag(tag)
}

export const getRandomImageByTag = async imageTag => {
  const apiKey = process.env.GIPHY_API_KEY
  const url = `${giphyUrl}/translate?api_key=${apiKey}&s=${imageTag}`
  var imgData
  try {
    const { data: imageData } = await axios.get(url)
    imgData = imageData
    const imageUrl = imageData.data.images.fixed_height.url
    return imageUrl
  } catch (err) {
    console.log('error retrieving giphy img')
  }
}
