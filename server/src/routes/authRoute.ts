import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import argon2 from 'argon2';
import userSchema from '../models/userSchema';

const route = express.Router();
const User = mongoose.model('User', userSchema);
const uri = process.env.PRIVATEKEY;

(async function connectMongoDB() {
    try {
        await mongoose.connect(uri);
    } catch (err) {
        return console.log(err);
    };
    console.log('Connected to database');
})();

route.post('/signup', async (req, res) => {
    console.log('New connection');
    let userObj = {
        name: req.body.name,
        pass: await argon2.hash(req.body.pass),
        email: req.body.email
    };

    const user = new User(userObj);
    user.save();
    console.log(userObj);
    res.sendStatus(200);
});

route.post('/login', async (req, res) => {
    // const user = await User.findOne({ name: req.body.name });
    // if (!user || !await argon2.verify(user.pass, req.body.pass)) {
    // exception: user does not exist
    //    console.log('Incorrect details: ' + req.body)
    //    return;
    // };

    req.session.userId = 'something';
    console.log('Login request session: ' + req.session.userId);
    res.json('you are now logged in');
});

export default route;