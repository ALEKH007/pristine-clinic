import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Manually parse .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');
let MONGODB_URI = '';
for (const line of lines) {
  if (line.trim().startsWith('MONGODB_URI=')) {
    MONGODB_URI = line.substring(line.indexOf('=') + 1).replace(/"/g, '').trim();
    break;
  }
}

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

async function run() {
  try {
    console.log('Connecting to MongoDB...');
    // Atlas might need some options or just the URI
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully');

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    for (const collection of collections) {
      const count = await mongoose.connection.db.collection(collection.name).countDocuments();
      console.log(`Collection ${collection.name}: ${count} documents`);
      
      if (count > 0) {
          const sample = await mongoose.connection.db.collection(collection.name).findOne();
          console.log(`Sample from ${collection.name}:`, JSON.stringify(sample, null, 2));
      }
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
