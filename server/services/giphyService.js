"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomImageByTag = exports.getImage = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _array = require("../utils/array");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const giphyUrl = 'http://api.giphy.com/v1/gifs';
const positiveTags = ['good work', 'you got it', 'great', 'epic'];
const negativeTags = ['you suck', 'terrible', 'bad', 'kanye west'];

const getImage = good => {
  const tag = (0, _array.randomItem)(good ? positiveTags : negativeTags);
  return getRandomImageByTag(tag);
};

exports.getImage = getImage;

const getRandomImageByTag = async imageTag => {
  const apiKey = process.env.GIPHY_API_KEY;
  const url = `${giphyUrl}/translate?api_key=${apiKey}&s=${imageTag}`;
  var imgData;

  try {
    const {
      data: imageData
    } = await _axios.default.get(url);
    imgData = imageData;
    const imageUrl = imageData.data.images.fixed_height.url;
    return imageUrl;
  } catch (err) {
    console.log('error retrieving giphy img');
  }
};

exports.getRandomImageByTag = getRandomImageByTag;