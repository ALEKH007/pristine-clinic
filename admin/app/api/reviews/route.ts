import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Review } from '@/lib/models/Review';

export async function GET() {
  try {
    await dbConnect();
    const reviews = await Review.find({ is_deleted: { $ne: true } }).sort({ created_at: -1 });
    return NextResponse.json({ success: true, data: reviews });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const review = await Review.create({
      user_name: body.user_name,
      rating: body.rating,
      comment: body.comment,
      source: body.source || 'manual',
      is_featured: body.is_featured || false,
    });
    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
