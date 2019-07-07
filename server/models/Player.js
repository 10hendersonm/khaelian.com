"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Player {
  constructor(name, role) {
    this.name = '';
    this.score = 0;
    this.article = null;
    this.judge = false;
    this.name = name;
    this.judge = role !== 'player';
  }

}

exports.default = Player;