import mongoose from 'mongoose';

const groupSchema = mongoose.Schema({
    groupName: String,
    members: [{ id: String, username: String, picturePath: String}],
})

const Group = mongoose.model(`Group`, groupSchema);

export default Group;