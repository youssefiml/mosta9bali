import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';

import connectDB from '../config/db.js';
import Blog from '../models/Blog.js';
import School from '../models/School.js';
import Scholarship from '../models/Scholarship.js';
import Community from '../models/Community.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const run = async () => {
  await connectDB();

  const read = (p) => JSON.parse(fs.readFileSync(path.join(__dirname, p), 'utf8'));

  try {
    await Blog.deleteMany({});
    await School.deleteMany({});
    await Scholarship.deleteMany({});
    await Community.deleteMany({});

    const blogs = read('blogs.json');
    const schools = read('schools.json');
    const scholarships = read('scholarships.json');
    const communities = read('community.json'); // match your file

    const blogsWithSlug = blogs.map(blog => ({
      ...blog,
      slug: slugify(blog.title, { lower: true, strict: true })
    }));

    await Blog.insertMany(blogsWithSlug);
    await School.insertMany(schools);
    await Scholarship.insertMany(scholarships);
    await Community.insertMany(communities);

    console.log('Seeding completed');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
};

run();
