import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
    picturePath: {type: String, default: '../public/images/default.png'},
    activeGroup: String,
    groups: [{id: String}]
})

const User = mongoose.model(`User`, userSchema);

export default User;