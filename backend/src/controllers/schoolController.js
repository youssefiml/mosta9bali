import School from '../models/School.js';

export const listSchools = async (req, res) => {
  const items = await School.find();
  res.json(items);
};

export const getSchool = async (req, res) => {
  const item = await School.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'School not found' });
  res.json(item);
};

export const createSchool = async (req, res) => {
  const newItem = await School.create(req.body);
  res.status(201).json(newItem);
};

export const updateSchool = async (req, res) => {
  const item = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'School not found' });
  res.json(item);
};

export const deleteSchool = async (req, res) => {
  const item = await School.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'School not found' });
  res.json({ ok: true });
};
