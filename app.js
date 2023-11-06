const express = require("express");
const dotenv = require("dotenv").config();
const routes = require("./routes");
const connectDB = require("./helper/mongdb");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.use(cookieParser());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

connectDB();

app.use("/", routes);

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
