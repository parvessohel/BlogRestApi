const router = require("express").Router()

const User = require("../models/userModel")
const bcrypt = require("bcrypt")

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPass,

        })


        const user = await newUser.save()
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json(err)
    }
})

//LOGIN




try {


    router.post("/login", async (req, res) => {
        const user = await User.findOne({ userName: req.body.userName })
        !user && res.status(400).json("Wrong Credentianls!")

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("Wrong Credentials!")

        const { password, ...others } = user._doc

        res.status(200).json(others)


    })

} catch (err) {
    return res.status(500).json(err)
}


module.exports = router