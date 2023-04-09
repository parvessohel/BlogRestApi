const router = require("express").Router()

const User = require("../models/userModel")

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            
        })
       

        const user = await newUser.save()
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json(err)    }
})

//LOGIN

module.exports = router