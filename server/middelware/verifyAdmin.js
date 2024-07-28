const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.roles === 'Admin') {
        next()
    }
    else {
        return res.status(403).json({
            error: true,
            massage: "Unauthorized Admin",
            data: null
        })
    }
}

module.exports = verifyAdmin