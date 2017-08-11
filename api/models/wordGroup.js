import mongoose from 'mongoose';

const WordGroupSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String, required: true },
  words: { type: Array, required: true },
  length: { type: Number, required: true }
});

export default mongoose.model('WordGroup', WordGroupSchema);
