import mongoose from 'mongoose';

const groupInquirySchema = mongoose.Schema({
    origin: {type: String, enum: ['USER', 'GROUP']},
    group: {_id: mongoose.Schema.ObjectId, groupName: String, picturePath: String},
    user: {_id: mongoose.Schema.ObjectId, username: String, picturePath: String}
})

export const GroupInquiry = mongoose.model(`GroupInquiry`, groupInquirySchema);

export default GroupInquiry;