const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

/* REGISTER */
router.post('/register', async (req, res) => {
    try {
        // generate new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        // save user and respond
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

/* LOGIN */
router.post('/login', async (req, res) => {
    try {
        // find user
        const user = await User.findOne({ username: req.body.username })

        // if user not found
        !user && res.status(400).json("Wrong credentials!")

        // validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password)

        // if password is invalid
        !validPassword && res.status(400).json("Wrong credentials!")

        // if password is valid
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router