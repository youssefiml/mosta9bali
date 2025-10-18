// src/controllers/communityController.js
import Community from '../models/Community.js';

export const listCommunities = async (req, res) => {
  const items = await Community.find();
  res.json(items);
};

export const getCommunity = async (req, res) => {
  const item = await Community.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Community not found' });
  res.json(item);
};

export const createCommunity = async (req, res) => {
  const newItem = await Community.create(req.body);
  res.status(201).json(newItem);
};

export const updateCommunity = async (req, res) => {
  const item = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Community not found' });
  res.json(item);
};

export const deleteCommunity = async (req, res) => {
  const item = await Community.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'Community not found' });
  res.json({ ok: true });
};
