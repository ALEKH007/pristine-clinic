import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ContactMessage } from '@/lib/models/ContactMessage';

export async function GET() {
  try {
    await dbConnect();
    const messages = await ContactMessage.find({}).sort({ created_at: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
