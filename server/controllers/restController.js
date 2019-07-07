"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Article = _interopRequireDefault(require("../models/Article"));

var _Player = _interopRequireDefault(require("../models/Player"));

var _array = require("../utils/array");

var giphyService = _interopRequireWildcard(require("../services/giphyService"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = wss => {
  var players = {};
  const app = (0, _express.Router)();

  const broadcastStatus = () => {
    wss.broadcast(getStatus());
  };

  const getStatus = () => {
    var broadcastPlayers = {};
    Object.entries(players).forEach(([name, value]) => {
      broadcastPlayers[name] = { ...value,
        article: !!value.article
      };
    });
    return {
      status: broadcastPlayers
    };
  };

  app.get('/status', (req, res) => {
    res.json(getStatus());
  });
  app.post('/join', (req, res) => {
    const {
      name,
      role
    } = req.query;
    var player = new _Player.default(name, role);

    if (player.judge) {
      Object.entries(players).forEach(([playerName, playerData]) => {
        players[playerName] = { ...playerData,
          judge: false
        };
      });
    }

    const prevPlayer = players[name];

    if (prevPlayer) {
      player = { ...player,
        score: prevPlayer.score
      };
    }

    players[name] = player;
    broadcastStatus();
    res.sendStatus(201);
  });
  app.post('/article', (req, res) => {
    const {
      link,
      title,
      playerName
    } = req.body;

    if (!link || !title) {
      res.sendStatus(400);
      return;
    }

    const article = new _Article.default(req.body);
    players[playerName].article = article;
    broadcastStatus();
    res.sendStatus(201);
  });
  app.get('/article', (req, res) => {
    const {
      playerName
    } = req.query;
    const currentPlayer = players[playerName];

    if (!currentPlayer) {
      res.sendStatus(401);
      return;
    }

    if (!currentPlayer.judge) {
      res.sendStatus(403);
      return;
    }

    const playerArr = Object.values(players).filter(({
      judge
    }) => !judge);
    const randomPlayer = (0, _array.randomItem)(playerArr);
    const {
      title,
      link
    } = randomPlayer.article;
    res.json({
      title,
      link
    });
  });
  app.post('/judge_guess', (req, res) => {
    const {
      playerName,
      articleTitle,
      judgeName
    } = req.body;
    const selectedPlayer = players[playerName];
    const judge = players[judgeName];

    if (!selectedPlayer || !judge) {
      res.sendStatus(404);
      return;
    }

    selectedPlayer.score++;

    if (selectedPlayer.article.title === articleTitle) {
      judge.score++;
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }

    Object.entries(players).forEach(([name, data]) => {
      const {
        article
      } = data;

      if (article && article.title === articleTitle) {
        players[name] = { ...data,
          article: null
        };
      }
    });
    broadcastStatus();
  });
  app.get('/image', async (req, res) => {
    const {
      correct
    } = req.query;
    const imageUrl = await giphyService.getImage(correct === 'true');
    res.send(imageUrl);
  });
  return app;
};

exports.default = _default;