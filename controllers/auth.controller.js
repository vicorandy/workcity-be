const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWTSECRET = process.env.JWT_SECRET || 'your_jwt_secret'
exports.signup = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, role });
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role },JWTSECRET, {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
