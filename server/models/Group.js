import mongoose from 'mongoose';

const groupSchema = mongoose.Schema({
    groupName: String,
    groupPhoto: String, 
    members: [{ userId: mongoose.Schema.ObjectId, username: String, picturePath: String, role: {type:String, default: 'member'}}],
    groupRecs: [{recId: mongoose.Schema.ObjectId, title: String, runtime: String, }]
})

const Group = mongoose.model(`Group`, groupSchema);

export default Group;