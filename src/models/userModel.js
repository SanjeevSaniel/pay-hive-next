import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
  },
  role: {
    type: String,
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpires: Date,
  verifyEmailToken: String,
  verifyEmailTokenExpires: Date,
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
