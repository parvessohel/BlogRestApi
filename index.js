const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")
const categoryRoute = require("./routes/categoryRoute")
const multer = require("multer")

const PORT = 3000

dotenv.config()

app.use(express.json())

try {
    mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to MongoDB Compass")
} catch (error) {
    console.log(error)
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, "hello.jpg")
    },
})

const upload = multer({ storage: storage })
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("Your image has been uploaded")
})

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", categoryRoute)


app.get("/", (req, res) => {
    res.send("Hi Hello")
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})