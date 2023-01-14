const express = require("express");
const mongoose = require("mongoose");
const { connection } = require("./config/db");
const { auth } = require("./middlewares/auth.middleware");
const { notesRouter } = require("./routes/notes.router");
const { userRouter } = require("./routes/users.router");
const  cors=require("cors");
require("dotenv").config();
connection
const app = express();
app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/user",userRouter)
app.use(auth)
app.use("/notes",notesRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to db");
        
    } catch (error) {
        console.log({message:error.message});
    }
    console.log("server has started")
})