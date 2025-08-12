import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// Create comment
router.post('/', async (req, res) => {
  try {
    const { taskId, author, text } = req.body;
    if (!taskId || !author || !text) {
      return res.status(400).json({ error: 'taskId, author and text required' });
    }
    const comment = await Comment.create({ taskId, author, text });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get comments for a task with pagination
router.get('/task/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const page = parseInt(req.query.page || '1');
    const limit = Math.min(parseInt(req.query.limit || '10'), 50);
    const skip = (page - 1) * limit;

    const query = { taskId, deletedAt: null };
    const [items, total] = await Promise.all([
      Comment.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Comment.countDocuments(query)
    ]);

    res.json({ items, total, page, limit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update comment
router.put('/:id', async (req, res) => {
  try {
    const updates = { ...req.body, edited: true };
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      updates,
      { new: true }
    );
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Soft delete comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );
    if (!comment) return res.status(404).json({ error: 'Comment not found or already deleted' });
    res.json({ message: 'Comment deleted', id: comment._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search comments by keyword
router.get('/search', async (req, res) => {
  try {
    const q = req.query.q || '';
    const taskId = req.query.taskId;
    const regex = { $regex: q, $options: 'i' };

    const filter = { text: regex, deletedAt: null };
    if (taskId) filter.taskId = taskId;

    const items = await Comment.find(filter).sort({ createdAt: -1 }).limit(50);
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
