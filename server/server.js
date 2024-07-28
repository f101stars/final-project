require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const mongoose = require("mongoose")


const PORT = process.env.PORT

const app = express()
connectDB()
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))

app.use("/api/turns",require("./routes/turn"))
app.use("/api/users",require("./routes/user"))
app.use("/api/auth",require("./routes/auth"))
app.use("/api/types",require("./routes/type"))

app.get("/", (req, res) => {
    res.send("home page")
})

mongoose.connection.once('open', () => {
    console.log("Connected to db!!!");
    app.listen(PORT, () => {
        console.log(`running on PORT ${PORT}`);
    })
})

mongoose.connection.on('error',err=>{
    console.log(err);
}) 