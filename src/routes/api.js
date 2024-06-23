import express from "express";
import userController from "../controller/userController"
import apiController from "../controller/apiController";
import groupController from "../controller/groupController"

const router = express.Router();
/**
 * @param {*} app - express app 
 */
const initApiRoutes = (app) => {
    //rest Api (get, post, put ,delete)
    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister) 
    router.post("/login", apiController.handleLogin);

    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);
    
    router.get("/group/read", groupController.readFunc);

    return app.use("/api/", router);
}

export default initApiRoutes;