"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ws = _interopRequireDefault(require("ws"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createServer = server => {
  const wss = new _ws.default.Server({
    server
  });

  wss.broadcast = data => {
    wss.clients.forEach(client => {
      if (client.readyState === _ws.default.OPEN) {
        sendMessage(client)(data);
      }
    });
  };

  return wss;
};

const sendMessage = client => data => {
  if (typeof data === 'object') data = JSON.stringify(data);
  client.send(data);
};

var _default = createServer;
exports.default = _default;