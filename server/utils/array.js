"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomItem = void 0;

const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

exports.randomItem = randomItem;