import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dbConnect from './lib/mongodb.ts';
import dotenv from 'dotenv';
import path from 'path';

// Load env from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function seed() {
  const { User } = await import('./lib/models/User.ts');
  await dbConnect();
  
  const email = "admin@pristine.com";
  const password = "admin123"; // USER: Please change this after first login!
  
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin user already exists.");
    process.exit(0);
  }

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  await User.create({
    full_name: "Clinic Admin",
    phone: "0000000000",
    email,
    role: "admin",
    password_hash
  });

  console.log("-----------------------------------------");
  console.log("Admin user created successfully!");
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log("-----------------------------------------");
  
  process.exit(0);
}

seed().catch(err => {
  console.error("Error seeding admin:", err);
  process.exit(1);
});
