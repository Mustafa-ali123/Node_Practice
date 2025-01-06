const User = require("../models/user")
const router = require("express").Router()
const bcrypt = require("bcrypt")

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    const userFind = await User.findOne({ email })
    if (userFind) {
        return res.send("User already exist").status(401)
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashPassword })
    await user.save()
    return res.send(user)
})
router.get("/", async (req, res) => {
    const user = await User.find()
    if (user.length == 0) {
        return res.send("User not found").status(400)
    }
    return res.send(user)
})

module.exports = router
