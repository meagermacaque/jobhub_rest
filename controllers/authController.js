const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

module.exports = {
    createUser: async (req, res) => {
        const user = req.body;

        try {
            await admin.auth().getUserByEmail(user.email);

            return res.status(400).json({
                message: "User already exists"
            });
        } catch(error) {
            if(error.code == 'auth/user-not-found'){
                try {
                    const userResponse = await admin.auth().createUser({
                        email: user.email,
                        password: user.password,
                        emailVerified: false,
                        disabled: false,
                    });
                    console.log(userResponse.uid);

                    const newUser = await new User({
                        uid: userResponse.uid,
                        username: user.username,
                        email: user.email,
                        password: CryptoJS.AES.encrypt(user.password, process.env.SECRET).toString(),
                    })

                    await newUser.save();
                    res.status(201).json({status: true})
                }
                catch(error){
                    res.status(500).json({error: 'An error occured while creating account'})
                }
            }
        }
    },

    loginUser: asyn (req, res) => {
        try {
            const user = await User.findOne({email: req.body.email},
                {__V: 0, createdAt: 0, updatedAt: 0, skills: 0, email: 0});
            
                if(!user) {
                    return res.status(400).json ({
                        message: 'User not found'
                    });
                };
        }
        catch () {}
    },
}