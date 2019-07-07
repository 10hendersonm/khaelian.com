"use strict";

var _http = _interopRequireDefault(require("http"));

var _webSocketController = _interopRequireDefault(require("./controllers/webSocketController"));

var _express = _interopRequireDefault(require("express"));

var _restController = _interopRequireDefault(require("./controllers/restController"));

var _staticFileController = _interopRequireDefault(require("./controllers/staticFileController"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _chalk = _interopRequireDefault(require("chalk"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// server
// express
// misc
_dotenv.default.config();

const app = (0, _express.default)();

const server = _http.default.createServer(app);

const wss = (0, _webSocketController.default)(server);
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use('/api', (0, _restController.default)(wss));
app.use(_staticFileController.default);
const port = process.env.APP_PORT || 8080;
server.listen(port, () => {
  console.log(_chalk.default.blue(`API available on port ${_chalk.default.yellow(port)}.`));
});