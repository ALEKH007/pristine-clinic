import mongoose from 'mongoose';
import { Service } from './lib/models/Service.js';
import { Review } from './lib/models/Review.js';
import { Gallery } from './lib/models/Gallery.js';
import dbConnect from './lib/mongodb.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const servicesData = [
  { name: "Teeth Cleaning", description: "Professional scale and polish to keep your teeth bright and gums healthy.", category: "dental", is_active: true },
  { name: "Root Canal", description: "Painless treatment to save infected teeth and provide immediate relief.", category: "dental", is_active: true },
  { name: "Cosmetic Dentistry", description: "Enhance your smile with whitening, veneers, and smile makeovers.", category: "dental", is_active: true },
  { name: "Extractions", description: "Safe and gentle tooth removal including wisdom tooth surgery.", category: "dental", is_active: true },
  { name: "Heart Care", description: "Consultation and diagnostic services for your cardiac health.", category: "heart", is_active: true }
];

const reviewsData = [
  { user_name: "Rahul Sharma", rating: 5, comment: "Nice clinic, good staff and better services. Highly recommended for family dental needs!", source: "manual", is_featured: true },
  { user_name: "Priya Kulkarni", rating: 5, comment: "Very cooperative staff. The hygiene levels are very high and they made me feel very comfortable.", source: "manual", is_featured: true },
  { user_name: "Ankit Mehta", rating: 5, comment: "Super light hand, excellent dental cleaning. The results are amazing and painless.", source: "manual", is_featured: true }
];

const galleryData = [
  { title: "Reception Area", image_url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop", description: "Our welcoming reception area." },
  { title: "Treatment Room", image_url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop", description: "Modern treatment facilities." },
  { title: "Waiting Lounge", image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuARXKzMarxmichKDugca5BNwLmx3Sx5r4xsJULatj3nrOaE6bHk56pGvHFt1uASwwgCqMscza7ZAo8Aho-xs1eHV_CvBoYPBn10EI2hSCwB16Z7muPc3_Iyif3MASnVqKyZ7W_8hn_VKwm63PJ2wNHBKcOB3uAjqBMTEU0nyhyGKUgalxHvIkVG3xX5R5ytfIimQBtu1f1A1yOxoClCqAzgRfbvU9Qkk8yQYpI2Q40fgUCROGIM9mBScbY0xnkkuR34DCP4h9ttZ5M", description: "Comfortable waiting area for patients." }
];

async function migrate() {
  await dbConnect();
  console.log("Connected to MongoDB...");

  // Seed Services
  for (const s of servicesData) {
    const exists = await Service.findOne({ name: s.name });
    if (!exists) {
      await Service.create(s);
      console.log(`Created service: ${s.name}`);
    }
  }

  // Seed Reviews
  for (const r of reviewsData) {
    const exists = await Review.findOne({ user_name: r.user_name, comment: r.comment });
    if (!exists) {
      await Review.create(r);
      console.log(`Created review by: ${r.user_name}`);
    }
  }

  // Seed Gallery
  for (const g of galleryData) {
    const exists = await Gallery.findOne({ title: g.title });
    if (!exists) {
      await Gallery.create(g);
      console.log(`Created gallery image: ${g.title}`);
    }
  }

  console.log("Migration complete!");
  process.exit(0);
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
