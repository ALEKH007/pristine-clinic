import mongoose from 'mongoose';

const ContactMessageSchema = new mongoose.Schema({
  full_name: { type: String, required: true, maxLength: 100 },
  phone: { type: String, required: true, maxLength: 15 },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'resolved'], default: 'new' }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

export const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema);
