import express from 'express';
// Hashing algorithm package
import argon2 from 'argon2';
//
import mongoose from 'mongoose';
import userSchema from '../models/userSchema';
import User from '../models/userSchema';

const uri: string = '';

(async function connectMongoDB() {
    await mongoose.connect(uri);
    console.log('Connected to database');
})();

const route = express.Router();

route.get('/signup', (req, res) => {
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
});

async function getHashedPassword(txt: string) {
    try {
        return await argon2.hash(txt);
    } catch {
        console.log('Error');
    };
};

export default route;
