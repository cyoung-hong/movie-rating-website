import mongoose from 'mongoose';

const groupInquirySchema = mongoose.Schema({
    origin: {type: String, enum: ['USER', 'GROUP']},
    group: {groupId: mongoose.Schema.ObjectId, groupName: String, picturePath: String},
    user: {userId: mongoose.Schema.ObjectId, username: String, picturePath: String}
})

export const GroupInquiry = mongoose.model(`GroupInquiry`, groupInquirySchema);

export default GroupInquiry;