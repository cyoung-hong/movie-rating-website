import mongoose from 'mongoose';

const groupInquirySchema = mongoose.Schema({
    origin: String,
    group: {id: String, groupName: String},
    user: {id: String, username: String, picturePath: String}
})

export const GroupInquiry = mongoose.model(`GroupInquiry`, groupInquirySchema);

export default GroupInquiry;