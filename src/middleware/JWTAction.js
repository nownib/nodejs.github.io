require("dotenv").config();
import jwt from "jsonwebtoken";

const nonSecurePaths = ["/register", "/login", "/logout"];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    let token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key); //data được lấy từ đây
  } catch (error) {
    console.log(error);
  }
  return decoded;
};

const extractToken = (req) => {
  //check token header
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const checkUserJWT = (req, res, next) => {
  //check login
  if (nonSecurePaths.includes(req.path)) return next();
  console.log("checknef", req.cookies);
  let cookies = req.cookies; //khi user login or reload or click (fetchuserredux) thi req dc gui xuong day, can giai ma decoded, check permission va gui den controller
  const tokenFromHeader = extractToken(req);

  if ((cookies && cookies.jwt) || tokenFromHeader) {
    let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
    let decoded = verifyToken(token); //data và token của controller, được giải mã và sử dụng
    if (decoded) {
      //ko co cookie -> ko co du lieu truyen xuong server -> logout
      req.user = decoded; // *** cos theer dinh kem them data gui den server controller
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Nott authenticated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account")
    return next();
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRoles;
    let currentURL = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You don't have permission to access this resource...",
      });
    }
    let canAccess = roles.some(
      (item) => item.url === currentURL || currentURL.includes(item.url)
    );

    if (canAccess === true) {
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "You don't have permission to access this resource...",
      });
    }
  }
};
module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
};
