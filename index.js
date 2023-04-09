const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")

const PORT = 5000

dotenv.config()

app.use(express.json())

try {
    mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to MongoDB Compass")
} catch (error) {
    console.log(error)
}

app.use("/api", authRoute)

// app.get("/", (req, res)=>{
//     res.send("Hi Hello")
// })

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})