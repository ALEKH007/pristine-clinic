import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Appointment } from '@/lib/models/Appointment';
import { User } from '@/lib/models/User';
import { Service } from '@/lib/models/Service';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const date = searchParams.get('date');

    let query: any = {};
    if (status) query.status = status;
    if (date) {
      const d = new Date(date);
      query.appointment_date = {
        $gte: new Date(d.setHours(0, 0, 0, 0)),
        $lte: new Date(d.setHours(23, 59, 59, 999))
      };
    }

    let appointments = await Appointment.find(query)
      .populate('user_id', 'full_name phone')
      .populate('service_id', 'name category')
      .sort({ appointment_date: -1 });

    if (search) {
      const s = search.toLowerCase();
      appointments = appointments.filter((a: any) =>
        a.user_id?.full_name?.toLowerCase().includes(s) ||
        a.user_id?.phone?.includes(s)
      );
    }

    return NextResponse.json({ success: true, data: appointments });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
