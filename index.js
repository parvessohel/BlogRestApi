const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")

dotenv.config()

const app = express()

// app.use(express.json())

try {
    mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to MongoDB Compass")
} catch (error) {
    console.log(error)
}




app.use("/api/auth", authRoute)

app.listen(5000, ()=>{
    console.log(`Server is running at localhost:${5000}`)
})