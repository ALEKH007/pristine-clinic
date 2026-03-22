import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Service } from '@/lib/models/Service';

export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find({ is_active: true }).sort({ category: 1, name: 1 });
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error('Services fetch error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 });
  }
}
