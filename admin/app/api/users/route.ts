import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/models/User';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const role = searchParams.get('role');

    let query: any = {};
    if (role) query.role = role;

    let users = await User.find(query, '-password_hash').sort({ created_at: -1 });

    if (search) {
      const s = search.toLowerCase();
      users = users.filter((u: any) =>
        u.full_name?.toLowerCase().includes(s) ||
        u.phone?.includes(s) ||
        u.email?.toLowerCase().includes(s)
      );
    }

    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
