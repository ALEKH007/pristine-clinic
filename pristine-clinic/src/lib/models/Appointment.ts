import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  appointment_date: { type: Date, required: true },
  appointment_time: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  notes: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
