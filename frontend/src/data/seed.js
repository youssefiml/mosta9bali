import dotenv from 'dotenv';
// import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from '../config/db.js';
import Blog from '../models/Blog.js';
import School from '../models/School.js';
import Scholarship from '../models/Scholarship.js';
import Community from '../models/Community.js';

dotenv.config();
// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to read JSON files
const readJSON = (fileName) => {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${fileName}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const seedData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing collections
    await Blog.deleteMany({});
    await School.deleteMany({});
    await Scholarship.deleteMany({});
    await Community.deleteMany({});
    console.log('Existing data cleared');

    // Read JSON files
    const blogs = readJSON('blogs.json');
    const schools = readJSON('schools.json');
    const scholarships = readJSON('scholarships.json');
    const communities = readJSON('communities.json');

    // Insert new data
    await Blog.insertMany(blogs);
    await School.insertMany(schools);
    await Scholarship.insertMany(scholarships);
    await Community.insertMany(communities);

    console.log('Data successfully seeded');
    } catch (err) {
    console.error('Error seeding data:', err);
  }
};

// Run the seeder
seedData();
