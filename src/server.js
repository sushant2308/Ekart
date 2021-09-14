const express = require('express');
require("../src/db/connection");
const authRoute = require("../src/routers/auth_route");


const app = express();
app.use(express.json());

//Route Middlewares
app.use("/auth", authRoute);


app.listen(3000, () => console.log("Server Up and running"));