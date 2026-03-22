import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ContactMessage } from '@/lib/models/ContactMessage';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );
    return NextResponse.json({ success: true, data: message });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
