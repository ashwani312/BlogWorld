const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//register

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })

        const user = await newUser.save();
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err)
    }
})

//login

router.post('/login', async (req, res) => {
    try {
     
       const user = await User.findOne({username : req.body.username});
       console.log(user)
        if (!user) {
            return res.status(400).json("Wrong credentials")
        }

        const validated = await bcrypt.compare(req.body.password, user.password)
        console.log("sdfwe")
        if (!validated) {
            return res.status(400).json("Wrong credentials")
        }
        const { password, ...others } = user._doc;
        console.log(others)
        return res.status(200).json(others)

    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router