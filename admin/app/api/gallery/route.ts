import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Gallery } from '@/lib/models/Gallery';

export async function GET() {
  try {
    await dbConnect();
    const images = await Gallery.find({}).sort({ uploaded_at: -1 });
    return NextResponse.json({ success: true, data: images });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const image = await Gallery.create({
      image_url: body.image_url,
      title: body.title,
      description: body.description,
    });
    return NextResponse.json({ success: true, data: image }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
