require("dotenv").config();
const express = require("express");
require("./config/dbConn");
const cors = require("cors");
const morgan = require("morgan");

// routes
const authRoute = require("./router/authRoute");
const userRoute = require("./router/userRoute");


const app = express();


// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


// routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);


// base url
app.get("/",(req,res)=>{
    res.status(201).json("server created");
});

// error handlers
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

// server port
app.listen(process.env.PORT, () => {
    console.log(`server started successfully`);
})