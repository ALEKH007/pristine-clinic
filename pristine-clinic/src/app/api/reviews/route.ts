import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Review } from '@/lib/models/Review';

export async function GET() {
  try {
    await dbConnect();
    // Only fetch featured reviews for the homepage
    const reviews = await Review.find({ is_deleted: false, is_featured: true }).sort({ created_at: -1 });
    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error('Reviews fetch error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
