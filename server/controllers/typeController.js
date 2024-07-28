const Type = require('../models/Type')
const getAllTypes = async (req, res) => {
    const types = await Type.find().lean()
    res.json({
        error: false,
        massage: "",
        data: types
    })

}

const getTypeById = async (req, res) => {
    const { id } = req.params
    const type = await Type.findById(id, { password: 0 }).lean()
    if (!type)
        res.status(404).json("dont find")
    res.json(type)
}

const creatType = async (req, res) => {
    const { title,time } = req.body

    if (!title || !time)
        return res.status(400).json({
            error: true,
            massage: "title and time are required!",
            data: null
        })
    const type = await Type.create({ title,time })
    return res.status(201).json({
        error: false,
        massage: "",
        data: type
    })
}

const updateType = async (req, res) => {
    const { _id, title,time } = req.body
    const type = await Type.findById(_id).exec()
    if (!title || !time)
    return res.status(400).json({
        error: true,
        massage: "title and time are required!",
        data: null
    })
    if (!type)
        return res.status(400).json({
            error: true,
            massage: "can't find the type",
            data: null
        })
    type.time = time
    type.title = title
    
    await type.save()
    return res.status(201).json({
        error: false,
        massage: "",
        data: type
    })
}

const deleteType = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({
            error: true,
            message: "Id is required",
            data: null
        })
    }
    const type = await Type.findById(_id)
    if (!type) {
        return res.status(400).json({
            error: true,
            message: "No Type found",
            data: null
        })
    }

    await type.deleteOne()

}


module.exports = { getAllTypes, getTypeById, creatType, updateType, deleteType }