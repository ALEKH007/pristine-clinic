import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Gallery } from '@/lib/models/Gallery';

export async function GET() {
  try {
    await dbConnect();
    const images = await Gallery.find().sort({ uploaded_at: -1 });
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery' }, { status: 500 });
  }
}
