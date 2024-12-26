"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require("dotenv").config();
var nonSecurePaths = ["/register", "/login", "/logout"];
var createJWT = function createJWT(payload) {
  var key = process.env.JWT_SECRET;
  var token = null;
  try {
    var _token = _jsonwebtoken["default"].sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
    return _token;
  } catch (error) {
    console.log(error);
  }
};
var verifyToken = function verifyToken(token) {
  var key = process.env.JWT_SECRET;
  var decoded = null;
  try {
    decoded = _jsonwebtoken["default"].verify(token, key); //data được lấy từ đây
  } catch (error) {
    console.log(error);
  }
  return decoded;
};
var extractToken = function extractToken(req) {
  //check token header
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};
var checkUserJWT = function checkUserJWT(req, res, next) {
  //check login
  if (nonSecurePaths.includes(req.path)) return next();
  console.log("checknef", req.cookies);
  var cookies = req.cookies; //khi user login or reload or click (fetchuserredux) thi req dc gui xuong day, can giai ma decoded, check permission va gui den controller
  var tokenFromHeader = extractToken(req);
  if (cookies && cookies.jwt || tokenFromHeader) {
    var token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
    var decoded = verifyToken(token); //data và token của controller, được giải mã và sử dụng
    if (decoded) {
      //ko co cookie -> ko co du lieu truyen xuong server -> logout
      req.user = decoded; // *** cos theer dinh kem them data gui den server controller
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Nott authenticated the user"
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user"
    });
  }
};
var checkUserPermission = function checkUserPermission(req, res, next) {
  if (nonSecurePaths.includes(req.path) || req.path === "/account") return next();
  if (req.user) {
    var email = req.user.email;
    var roles = req.user.groupWithRoles;
    var currentURL = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You don't have permission to access this resource..."
      });
    }
    var canAccess = roles.some(function (item) {
      return item.url === currentURL || currentURL.includes(item.url);
    });
    if (canAccess === true) {
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "You don't have permission to access this resource..."
      });
    }
  }
};
module.exports = {
  createJWT: createJWT,
  verifyToken: verifyToken,
  checkUserJWT: checkUserJWT,
  checkUserPermission: checkUserPermission
};