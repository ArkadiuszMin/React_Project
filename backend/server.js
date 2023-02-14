const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser');
require ('dotenv').config();
const PORT = process.env.PORT;


let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let sql = require('./db.js');

const authRoute = require('./routes/auth')
app.use('/auth', authRoute)

const profileRoute = require("./routes/profile")
app.use('/profile', profileRoute)

app.get("/", (req, res) => {
    res.send({ status: "OK" })
})


app.listen(PORT, function () {
    console.log("Backend API listening on port " + PORT)
})