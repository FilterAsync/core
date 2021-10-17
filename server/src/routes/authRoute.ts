import express from 'express';
// Hashing algorithm package
import argon2 from 'argon2';
//
import mongoose from 'mongoose';
import userSchema from '../models/userSchema';
import User from '../models/userSchema';

const uri: string = 'mongodb+srv://admin:1234@core.vipke.mongodb.net/core';

(async function connectMongoDB() {
    await mongoose.connect(uri);
    console.log('Connected to database');
})();

const route = express.Router();

route.post('/signup', (req, res) => {
    console.log('New connection');
    const userObj = {
        name: req.body.name,
        pass: req.body.pass,
        email: req.body.email
    };

    getHashedPassword(req.body.pass).then((hashedPassword) => {
        userObj.pass = hashedPassword;
        console.log(userObj);
    });

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