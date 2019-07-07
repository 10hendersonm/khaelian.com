"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Article {
  constructor(props) {
    this.title = '';
    this.link = '';

    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        this[key] = value;
      });
    }
  }

}

exports.default = Article;