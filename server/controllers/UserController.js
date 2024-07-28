const User = require('../models/User')
const bcrypt = require("bcrypt")
const getAllUsers = async (req, res) => {
    const users = await User.find({ deleted: false }, { password: 0 }).lean()
    res.json({
        error: false,
        massage: "",
        data: users
    })

}

const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id, { password: 0 }).lean()
    if (!user)
        res.status(404).json("dont find")
    res.json(user)
}

const creatUser = async (req, res) => {
    const { fullname, username, password, email, phone, active } = req.body
    const image = (req.file?.filename ? req.file.filename : "")

    if (!username || !fullname || !password || !phone)
        return res.status(400).json({
            error: true,
            massage: "username and name  and password and phone are required!",
            data: null
        })
    const findusername = await User.findOne({ username }).lean()
    if (findusername)
        return res.status(400).json({
            error: true,
            massage: "input another username",
            data: null
        })
    const hashPass = await bcrypt.hash(password, 10)
    const user = await User.create({ fullname, username, password: hashPass, email, phone, active, image })
    return res.status(201).json({
        error: false,
        massage: "",
        data: user
    })
}

const updateUser = async (req, res) => {
    const { _id, fullname, username, password, email, phone, active } = req.body
    const image = (req.file?.filename ? req.file.filename : "")
    const user = await User.findById(_id).exec()
    if (!username || !fullname || !phone || !_id)
        return res.status(400).json({
            error: true,
            massage: "id and username and name and password and phone are required!",
            data: null
        })
    if (!user)
        return res.status(400).json({
            error: true,
            massage: "can't find the user",
            data: null
        })
    user.fullname = fullname
    user.username = username
    user.email = email
    user.phone = phone
    user.active = active
    if (image) {
        user.image = image
    }
    await user.save()
    return res.status(201).json({
        error: false,
        massage: "",
        data: user
    })
}

const deleteUser = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({
            error: true,
            message: "Id is required",
            data: null
        })
    }
    const user = await User.findById(_id)
    if (!user) {
        return res.status(400).json({
            error: true,
            message: "No User found",
            data: null
        })
    }
    user.deleted = true
    const updateUser = await user.save()
    res.json({
        error: false,
        message: "",
        data: { username: updateUser.username, _id: updateUser._id }
    })
}


module.exports = { getAllUsers, getUserById, creatUser, updateUser, deleteUser }