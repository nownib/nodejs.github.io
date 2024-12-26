"use strict";

var _express = _interopRequireDefault(require("express"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _web = _interopRequireDefault(require("./routes/web"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _api = _interopRequireDefault(require("./routes/api"));
var _cors = _interopRequireDefault(require("./config/cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require("dotenv").config();
var app = (0, _express["default"])();
(0, _connectDB["default"])();
(0, _cors["default"])(app);
//config view engine
(0, _viewEngine["default"])(app);
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
var port = process.env.PORT || 8088;

//config cookie parser
app.use((0, _cookieParser["default"])());
//init all web routes
(0, _web["default"])(app);
(0, _api["default"])(app);
app.use(function (req, res) {
  return res.send("404 not found");
});
app.listen(port, function () {
  console.log("NodeJSServer is running at the port : " + port);
});