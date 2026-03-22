import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Appointment } from '@/lib/models/Appointment';
import { User } from '@/lib/models/User';
import { Review } from '@/lib/models/Review';
import { ContactMessage } from '@/lib/models/ContactMessage';
import { Service } from '@/lib/models/Service';
import { Gallery } from '@/lib/models/Gallery';

export async function GET() {
  try {
    await dbConnect();

    const [totalAppointments, todayAppointments, totalUsers, pendingMessages, totalReviews, totalServices, totalGallery] = await Promise.all([
      Appointment.countDocuments({}),
      Appointment.countDocuments({
        appointment_date: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lte: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }),
      User.countDocuments({}),
      ContactMessage.countDocuments({ status: 'new' }),
      Review.countDocuments({ is_deleted: { $ne: true } }),
      Service.countDocuments({ is_active: true }),
      Gallery.countDocuments({}),
    ]);

    // Last 7 days appointments for chart
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const dailyData = await Appointment.aggregate([
      { $match: { appointment_date: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$appointment_date' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const statusData = await Appointment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalAppointments,
        todayAppointments,
        totalUsers,
        pendingMessages,
        totalReviews,
        totalServices,
        totalGallery,
        dailyData,
        statusData
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
