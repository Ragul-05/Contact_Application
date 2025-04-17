const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc Register a user
//@route POST /api/users/register
//access public 
const registeruser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please Fill All Fields");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User Already Exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("Invalid User Data");
    }
});
//@desc  Login user
//@route POST /api/users/login
//access public 
const loginuser = asyncHandler(async (req, res) => {
    console.log('Login request body:', req.body);
    const { email, password } = req.body;
    console.log('Destructured fields:', { email, password });
    if (!email || !password) {
        res.status(400);
        throw new Error('Please Fill All Fields');
    }
    console.log('Querying user with email:', email);
    const user = await User.findOne({ email }).maxTimeMS(5000);
    console.log('User found:', user ? user.email : 'Not found');
    if (user) {
        console.log('Comparing password');
        const start = Date.now();
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Password comparison timed out')), 2000)
        );
        let isMatch;
        try {
            isMatch = await Promise.race([
                bcrypt.compare(password, user.password),
                timeoutPromise
            ]);
        } catch (error) {
            console.error('Password comparison error:', error);
            res.status(500);
            throw new Error('Failed to verify password');
        }
        console.log(`Password comparison took ${Date.now() - start}ms`);
        if (isMatch) {
            console.log('Generating JWT, secret loaded:', !!process.env.ACCESS_TOKEN_SECRET);
            let accessToken;
            try {
                accessToken = jwt.sign(
                    {
                        user: {
                            username: user.username,
                            email: user.email,
                            id: user._id,
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' }
                );
            } catch (error) {
                console.error('JWT signing error:', error);
                res.status(500);
                throw new Error('Failed to generate access token');
            }
            console.log('Sending access token');
            res.status(200).json({ accessToken });
        } else {
            res.status(401);
            throw new Error('Invalid Password');
        }
    } else {
        res.status(401);
        throw new Error('Invalid Email');
    }
});
//@desc Get current user
//@route GET /api/users/current
//@access Private
const getcurrentuser = asyncHandler(async (req, res) => {
    res.json({ message: "Current User Information" });
});

module.exports = { registeruser, loginuser, getcurrentuser };

module.exports = {
    registeruser,loginuser,getcurrentuser
};
