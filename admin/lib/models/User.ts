import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  full_name: { type: String, required: true, maxLength: 100 },
  phone: { type: String, required: true, unique: true, maxLength: 15 },
  email: { type: String, maxLength: 100 },
  role: { type: String, enum: ['patient', 'admin'], default: 'patient' },
  password_hash: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
