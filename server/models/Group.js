import mongoose from 'mongoose';

const groupSchema = mongoose.Schema({
    groupName: String,
    groupPhoto: String, 
    members: [{ id: String, username: String, picturePath: String, role: {type:String, default: 'member'}}],
})

const Group = mongoose.model(`Group`, groupSchema);

export default Group;