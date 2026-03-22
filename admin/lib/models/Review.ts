import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  user_name: { type: String, required: true, maxLength: 100 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  source: { type: String, enum: ['google', 'manual'], required: true },
  is_featured: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

export const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
