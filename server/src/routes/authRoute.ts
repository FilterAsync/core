import express from 'express';
// Hashing algorithm package
import argon2 from 'argon2';
//
import mongoose from 'mongoose';
import User from '../models/userSchema';

const uri: string = '';

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

    res.sendStatus(200);
});

async function getHashedPassword(txt: string) {
    try {
        return await argon2.hash(txt);
    } catch {
        console.log('Error');
    };
};

export default route;
