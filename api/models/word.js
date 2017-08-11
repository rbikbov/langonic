import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
  original: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  translated: { type: String, required: true, lowercase: true },
  frequency: { type: Number, required: true, default: 1 }
});

export default mongoose.model('Word', WordSchema);
