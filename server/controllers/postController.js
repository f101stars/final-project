const Post = require('../models/Post')
const getAllPosts = async (req, res) => {
    const posts = await Post.find().populate("user").lean()
    res.json({
        error: false,
        massage: "",
        data: posts
    })

}

const creatPost = async (req, res) => {
    const { text,user } = req.body

    if (!text || !user  )
        return res.status(400).json({
            error: true,
            massage: "text and user are required!",
            data: null
        })
    
    const post = await Post.create({ text,user })
    return res.status(201).json({
        error: false,
        massage: "",
        data: post
    })
}

const deletePost = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({
            error: true,
            message: "Id is required",
            data: null
        })
    }
    const post = await Post.findById(_id)
    if (!post) {
        return res.status(400).json({
            error: true,
            message: "No Post found",
            data: null
        })
    }

    await post.deleteOne()

}


module.exports = { getAllPosts, creatPost, deletePost }