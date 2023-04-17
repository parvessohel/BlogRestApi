const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/userRoute")

const PORT = 3000

dotenv.config()

app.use(express.json())

try {
    mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to MongoDB Compass")
} catch (error) {
    console.log(error)
}

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)

app.get("/", (req, res)=>{
    res.send("Hi Hello")
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})