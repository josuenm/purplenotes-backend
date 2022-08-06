import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, 10, (error, hashedPassword) => {
      const hashed = hashedPassword;
      if (error) {
        next(error);
      } else {
        this.password = hashed;
        next();
      }
    });
  }
});

userSchema.methods.isCorrectPassword = function (password, next) {
  bcrypt.compare(password, this.password, function (error, same) {
    if (error) {
      next(error);
    } else {
      next(same);
    }
  });
};

export default mongoose.model('User', userSchema);
