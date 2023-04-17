const router = require("express").Router()

const User = require("../models/userModel")
const bcrypt = require("bcrypt")


//UPDATE
router.put("/:id", async (req, res) => {

    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new: true})
const {password, ...others} = updatedUser._doc

            res.status(200).json(others)

        } catch (err) {
            return res.status(500).json(err)
        }
    }
    else {

        res.status(401).json("You can only update your own account!")

    }
})

//DELETE


router.delete("/:id", async (req, res) => {

    if (req.body.userId === req.params.id) {
        
        try {
           await User.findByIdAndDelete(req.params.id)
            res.status.apply(200).json("User has been deleted...")
            
        } catch (err) {
            return res.status(500).json(err)
        }
    }
    else {

        res.status(401).json("You can only delete your own account!")

    }
})

module.exports = router