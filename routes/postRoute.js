const router = require("express").Router()

const User = require("../models/userModel")
const Post = require("../models/postModel")



//CREATE
router.post("/", async (req, res) => {

    const newPost = await new Post(req.body)
    try {
        const savedPost = newPost.save()
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE


router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userName === req.body.userName) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                )
                res.status(500).json(updatedPost)
            } catch (error) {
                res.status(500).json(err)
            }
        }
        else {
            res.status(500).json("You can only update your posts")
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
})



// DELETE


router.delete("/:id", async (req, res) => {
    try {

        const post = await Post.findById(req.params.id)
        if (post.userName === req.body.userName) {
            try {
                await post.delete()
                res.status(200).json("Yor post has been deleted")
            } catch (error) {
                res.status(500).json(err)
            }
        }
        else {
            res.status(401).json("You can only delete your posts")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }

})

// GET POSTS BY ID

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        res.status(200).json(post)
    } catch (err) {
        return res.status(500).json(err)
    }
})


// GET ALL POSTS

router.get("/", async (req, res) => {

    const userName = req.query.user
    const catName = req.query.cat
    try {

        let posts
        if (userName) {

            posts = await Post.find({ userName })

        }
        else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName]
                }
            })
        }
        else {

            posts = await Post.find()
        }
        res.status(200).json(posts)
    }


    catch (err) {
        return res.status(500).json(err)
    }
})


module.exports = router