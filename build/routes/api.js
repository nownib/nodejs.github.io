"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controller/userController"));
var _apiController = _interopRequireDefault(require("../controller/apiController"));
var _groupController = _interopRequireDefault(require("../controller/groupController"));
var _JWTAction = require("../middleware/JWTAction");
var _roleController = _interopRequireDefault(require("../controller/roleController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
/**
 * @param {*} app - express app
 */

var initApiRoutes = function initApiRoutes(app) {
  router.all("*", _JWTAction.checkUserJWT, _JWTAction.checkUserPermission);
  //rest Api (get, post, put ,delete) 
  router.post("/register", _apiController["default"].handleRegister);
  router.post("/login", _apiController["default"].handleLogin);
  router.post("/logout", _apiController["default"].handleLogout);

  //user routes
  router.get("/account", _userController["default"].getUserAccount);
  router.get("/user/read", _userController["default"].readFunc);
  router.post("/user/create", _userController["default"].createFunc);
  router.put("/user/update", _userController["default"].updateFunc);
  router["delete"]("/user/delete", _userController["default"].deleteFunc);

  //role routes
  router.get("/role/read", _roleController["default"].readFunc);
  router.post("/role/create", _roleController["default"].createFunc);
  router.put("/role/update", _roleController["default"].updateFunc);
  router["delete"]("/role/delete", _roleController["default"].deleteFunc);
  router.get("/role/by-group/:groupId", _roleController["default"].getRoleByGroup);
  router.post("/role/assign-to-group", _roleController["default"].assignRoleToGroup);
  //group routes
  router.get("/group/read", _groupController["default"].readFunc);
  return app.use("/api/", router);
};
var _default = exports["default"] = initApiRoutes;