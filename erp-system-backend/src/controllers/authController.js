const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const Joi = require('joi');
const dotenv = require('dotenv');

dotenv.config();

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('student', 'instructor', 'hr_manager', 'staff', 'accountant', 'marketing_officer').required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  username: Joi.string(),
  password: Joi.string().min(6),
});

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can create users' });

  const { username, email, role } = req.body;
  const password = Math.random().toString(36).slice(-8); // Temporary password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, email, hashed_password: hashedPassword, role });
    res.status(201).json({ message: 'User created', userId: user.user_id, tempEmail: email, tempPassword: password });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', err });
  }
};

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.hashed_password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', err });
  }
};

const updateUser = async (req, res) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const userId = req.user.userId;
  const { username, password } = req.body;

  try {
    const updates = {};
    if (username) updates.username = username;
    if (password) updates.hashed_password = await bcrypt.hash(password, 10);

    const [updated] = await User.update(updates, { where: { user_id: userId } });
    if (updated) res.json({ message: 'User updated' });
    else res.status(404).json({ message: 'User not found' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', err });
  }
};

module.exports = { register, login, updateUser };