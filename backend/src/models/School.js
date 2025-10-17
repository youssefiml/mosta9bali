import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String },
  city: { type: String },
  website: { type: String },
  description: { type: String }
}, { timestamps: true });

const School = mongoose.model('School', schoolSchema);
export default School;
