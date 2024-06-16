import express from "express";
import apiController from "../controller/apiController";

const router = express.Router();
/**
 * @param {*} app - express app 
 */
const initApiRoutes = (app) => {
    //rest Api (get, post, put ,delete)
    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister)
    
    router.post("/login", apiController.handleLogin);
    return app.use("/api/", router);
}

export default initApiRoutes;