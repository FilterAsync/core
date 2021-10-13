import express from 'express';
// Hashing algorithm package
import argon2 from 'argon2';
//
import mongodb from 'mongodb';

const uri: string = 'mongodb+srv://admin:<password>@core.vipke.mongodb.net';

(async function connectMongoDB() {

})()

const route = express.Router();

route.get('/signup', (req, res) => {
    getHashedPassword(req.body.pass).then((hashedPassword) => {
        console.log(hashedPassword);
        return res.send(hashedPassword);
    });
});

async function getHashedPassword(txt: string) {
    try {
        return await argon2.hash(txt);
    } catch {
        console.log('Error');
    };
};

export default route;