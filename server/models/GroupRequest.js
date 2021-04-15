import mongoose from 'mongoose';

const groupRequestSchema = mongoose.Schema({
    group: {id: String, groupName: String},
    user: {id: String, username: String, picturePath: String}
})

export const GroupRequest = mongoose.model(`GroupRequest`, groupRequestSchema);

export default GroupRequest;