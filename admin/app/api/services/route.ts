import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Service } from '@/lib/models/Service';

export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find({}).sort({ category: 1, name: 1 });
    return NextResponse.json({ success: true, data: services });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const service = await Service.create({
      name: body.name,
      description: body.description,
      category: body.category,
      price: body.price,
      duration_minutes: body.duration_minutes,
      is_active: body.is_active !== false,
    });
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
