import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'usernameRequired'],
    maxlength: [32, 'tooLong'],
    minlength: [6, 'tooShort'],
    match: [/^[a-z0-9]+$/, 'usernameIncorrect'],
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'emailRequired'],
    index: true,
    unique: true
  },
  // password: { type: String },
  vkontakteId: { type: String },
  facebookId: { type: String },
  googleId: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  birthday: { type: Date },
  photo: { type: String },
  gender: { type: String },

  registrated: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

// UserSchema.pre('save', async (next) => {
//   if (!this.isModified('password')) {
//     return next()
//   }
//
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(this.password, salt);
//
//   this.password = hash;
//   next();
// });
//
// UserSchema.methods.comparePasswords = (password) => {
//   return bcrypt.compare(password, this.password)
// };

export default mongoose.model('User', UserSchema);
