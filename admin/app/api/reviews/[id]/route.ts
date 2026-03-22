import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Review } from '@/lib/models/Review';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const update: any = {};
    if (body.user_name !== undefined) update.user_name = body.user_name;
    if (body.rating !== undefined) update.rating = body.rating;
    if (body.comment !== undefined) update.comment = body.comment;
    if (body.is_featured !== undefined) update.is_featured = body.is_featured;
    if (body.source !== undefined) update.source = body.source;

    const review = await Review.findByIdAndUpdate(id, update, { new: true });
    return NextResponse.json({ success: true, data: review });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    // Soft delete
    await Review.findByIdAndUpdate(id, { is_deleted: true });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
