import express from 'express';
import viewEngine from "./config/viewEngine";
import allWebRoutes from './routes/web';
import bodyParser from 'body-parser';
// import connection from './config/connectDB';


require('dotenv').config();

let app = express();

//config view engine
viewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 8080;


//test connection DB
// connection();
//init all web routes
allWebRoutes(app);

app.listen(port, () => {
    console.log('NodeJSServer is running at the port : ' + port);
})