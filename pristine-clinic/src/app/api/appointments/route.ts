import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Appointment } from '@/lib/models/Appointment';
import { User } from '@/lib/models/User';
import { Service } from '@/lib/models/Service';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await dbConnect();
    const appointments = await Appointment.find({})
      .populate('user_id', 'full_name phone')
      .populate('service_id', 'name category')
      .sort({ appointment_date: -1 });
    
    return NextResponse.json({ success: true, data: appointments });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Simplification: In a full app, we would find or create the User and the Service based on form data.
    // Assuming form sends: { full_name, phone, appointment_date, appointment_time, service_name }
    
    // Find or construct dummy User
    let user = await User.findOne({ phone: body.phone });
    if (!user) {
      user = await User.create({ full_name: body.full_name, phone: body.phone });
    }

    // Find requested Service
    let service = await Service.findOne({ name: body.service_name });
    if (!service) {
      // Default to a dummy service if not found (or create it)
      service = await Service.create({ name: body.service_name || 'General Query', category: 'dental' });
    }

    const appointment = await Appointment.create({
      user_id: user._id,
      service_id: service._id,
      appointment_date: new Date(body.appointment_date),
      appointment_time: body.appointment_time || "10:00",
      notes: "Booked via Website"
    });
    
    return NextResponse.json(
      { success: true, data: appointment },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
