import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  wordGroup: { type: mongoose.Schema.Types.ObjectId, required: true },
  mistakeWords: { type: [], default: [] },
  progress: { type: Number, default: 0 },
  length: { type: Number, required: true }
});

export default mongoose.model('Course', CourseSchema);
