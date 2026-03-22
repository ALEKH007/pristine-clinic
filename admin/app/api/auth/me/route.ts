import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev-only';

export async function GET() {
  const token = (await cookies()).get('admin_token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ success: true, user: decoded });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
  }
}
