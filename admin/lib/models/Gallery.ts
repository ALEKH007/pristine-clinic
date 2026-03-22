import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  image_url: { type: String, required: true },
  title: { type: String, maxLength: 100 },
  description: { type: String }
}, { timestamps: { createdAt: 'uploaded_at', updatedAt: false } });

export const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
