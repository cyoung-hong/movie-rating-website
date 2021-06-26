import mongoose from 'mongoose';
import Group from './Group.js';

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
    picturePath: {type: String, default: '../public/images/default.png'},
    activeGroup: {type: mongoose.Schema.ObjectId, ref: 'Group', default: null},
    groups: [{id: mongoose.Schema.ObjectId}]
})

const User = mongoose.model(`User`, userSchema);

export default User;