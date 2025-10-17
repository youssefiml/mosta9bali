import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  provider: { type: String },
  amount: { type: String },
  deadline: { type: Date },
  url: { type: String },
  description: { type: String }
}, { timestamps: true });

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
export default Scholarship;
