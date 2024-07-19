import express from "express";
require("dotenv").config();
import viewEngine from "./config/viewEngine";
import allWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
import { createJWT, verifyToken } from "./middleware/JWTAction";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB";

let app = express();
connectDB();
configCors(app);
//config view engine
viewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 8088;

//config cookie parser
app.use(cookieParser());
//init all web routes
allWebRoutes(app);
initApiRoutes(app);
app.use((req, res) => {
  return res.send("404 not found");
});
app.listen(port, () => {
  console.log("NodeJSServer is running at the port : " + port);
});
