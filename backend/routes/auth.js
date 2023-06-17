const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

const JWT_SECRET = "kalashisthemostpowerfullman"

// ROUTE 1: Create a User using : POST "/api/auth/createuser". No login required
router.post('/createuser',

    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    ],

    async (req, res) => {

        // if there are error, return bad request or error!
        const error = validationResult(req);
        if (!error.isEmpty()) {
            success = false
            return res.status(400).json({
                success,
                error: error.array()
            });
        }

        // check wether the user woth same email exist already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                success = false
                return res.status(400).json({
                    success,
                    error: "User already exists"
                })
            }

            // bcrypt password
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)

            // create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })

            // JWT Token use to get user info with the help of token
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            success = true
            res.json({ success, authToken })
        }

        // catch error
        catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
        }

        // .then(user => { res.json(user) })
        // .catch(err => { console.log(err) })

    })




// ROUTE 2:  Authentatic a User using : POST "/api/auth/login". No login required
router.post('/login',

    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank').exists()
    ],

    async (req, res) => {

        // if there are error, return bad request or error!
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                error: error.array()
            });
        }

        // find user by email
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    error: "Please try to login with correct credentials"
                })
            }

            // check if password is correct
            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                success = false
                return res.status(400).json({
                    success,
                    error: "Please try to login with correct credentials"
                })
            }

            // create a token
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            success = true
            res.json({ success, authToken })
        }

        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })



// ROUTE 3: Get loggedin user detail using : POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {

    // if there are error, return bad request or error!
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        });
    }
    try {
        const userID = req.user.id
        const user = await User.findById(userID).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}
)

module.exports = router