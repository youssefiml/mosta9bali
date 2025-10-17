import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  link: { type: String }
}, { timestamps: true });

const Community = mongoose.model('Community', communitySchema);
export default Community;
