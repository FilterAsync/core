import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
// Hashing algorithm package
import argon2 from 'argon2';
//
import userSchema from '../models/userSchema';

const User = mongoose.model('User', userSchema);

const uri: string = process.env.PRIVATEKEY as string; // change in production mode

(async function connectMongoDB() {
    await mongoose.connect(uri);
    console.log('Connected to database');
})();

const route = express.Router();

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
    const user = await User.findOne({ name: req.body.name });
    if (!user || !await argon2.verify(user.pass, req.body.pass)) {
        // exception: user does not exist
        return;
    };
    res.sendStatus(200);

    // OLD CODE
    /*
    if (User.findOne({ name: req.body.name }, async (err, user) => {
        await argon2.verify(user.pass, req.body.pass)
            .catch((err) => {
                console.log('Error');
            });
        console.log('Success');
    })) {
        console.log('Database search succeded');
    } else {
        console.log('Database search error');
    }
    */
})

export default route;