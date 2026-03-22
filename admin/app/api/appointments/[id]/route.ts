import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Appointment } from '@/lib/models/Appointment';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const allowedFields: any = {};
    if (body.status) allowedFields.status = body.status;
    if (body.notes !== undefined) allowedFields.notes = body.notes;

    const appointment = await Appointment.findByIdAndUpdate(id, allowedFields, { new: true });
    if (!appointment) {
      return NextResponse.json({ success: false, error: 'Appointment not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: appointment });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    await Appointment.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
