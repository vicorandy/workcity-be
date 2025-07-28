const jwt = require('jsonwebtoken');
const JWTSECRET = process.env.JWT_SECRET || 'your_jwt_secret'

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  console.log(auth)
  if (!auth?.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(auth.split(' ')[1], JWTSECRET);
    req.user = decoded;
    console.log({decoded})
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
};
