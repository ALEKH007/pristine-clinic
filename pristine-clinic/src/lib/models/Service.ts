import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String },
  category: { type: String, enum: ['dental', 'heart'], required: true },
  price: { type: Number },
  duration_minutes: { type: Number },
  is_active: { type: Boolean, default: true }
});

export const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
