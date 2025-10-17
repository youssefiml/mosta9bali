import Scholarship from '../models/Scholarship.js';

export const listScholarships = async (req, res) => {
  const items = await Scholarship.find();
  res.json(items);
};

export const getScholarship = async (req, res) => {
  const item = await Scholarship.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Scholarship not found' });
  res.json(item);
};

export const createScholarship = async (req, res) => {
  const newItem = await Scholarship.create(req.body);
  res.status(201).json(newItem);
};

export const updateScholarship = async (req, res) => {
  const item = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Scholarship not found' });
  res.json(item);
};

export const deleteScholarship = async (req, res) => {
  const item = await Scholarship.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'Scholarship not found' });
  res.json({ ok: true });
};
