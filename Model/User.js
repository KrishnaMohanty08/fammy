// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Use _id as ObjectId
  githubId: { type: String, unique: true },
  username: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  bio: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
