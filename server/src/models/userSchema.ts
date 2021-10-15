import mongoose, { Mongoose } from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    id: false
});
const User = mongoose.model('User', userSchema);

export default User;