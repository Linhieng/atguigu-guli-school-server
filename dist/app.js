"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _todo = _interopRequireDefault(require("./routes/todo"));

var _bodyParser = require("body-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = 8080;
app.use((0, _bodyParser.json)());
app.use('/todos', _todo["default"]);
app.use(function (err, req, res, next) {
  if (!err) {
    next();
  }

  res.status(500).json({
    message: err.message
  });
});

_http["default"].createServer(app).listen(PORT, function () {
  console.log("listen http://localhost:".concat(PORT, " ..."));
});