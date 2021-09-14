const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()
mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser: true,

}).then(
    console.log("Connection established")
).catch(
    (e)=>console.log(e)
);