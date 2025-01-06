const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const router = require("express").Router()

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const Jwt_Key = "Testing"
    try {
        const result = await User.findOne({ email })
        if (!result) {
            res.send("User not found").status(400)
        }

        const confirm = await bcrypt.compare(password, result.password)

        if (!confirm) {
            res.send("Enter invalid password.").status(401)
        }
        const payload = {
            email, name: result.name
        }
        const token = jwt.sign(payload, Jwt_Key, { expiresIn: "1y" })
        return res.send({ ...result.toObject(), token: `Bearer ${token}` }).status(200)
    } catch (orerr) {
        console.log("Internal Error", error)
    }

})

module.exports = router