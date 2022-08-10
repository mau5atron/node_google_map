const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const port = 8080;
const bodyParser = require("body-parser");
const ejs = require('ejs');
const process = require("process"); // for accessing env
app.use(express.static(__dirname + "/public")); // this actually displays all static content    
// console.log("public path : ", app.use(express.static(path.join(__dirname, "/public"))));
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.get("/map", (req, res) => {
    // console.log("PATH: ", __dirname + "/public");
    res.render("map/index", {
        envAPIKey: process.env.MAPS_AND_GEOCODE_API_KEY
    });
    // res.send("hello world!");
});

app.post("/store_location", (req, res) => {
    console.log("req body from maps: ", req.body);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});