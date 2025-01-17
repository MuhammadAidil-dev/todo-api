const jwt = require('jsonwebtoken');
const authMiddleware = async (req, res, next) => {
  const secretKey = process.env.JWT_SECRET;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: 'error', message: 'No token Provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; //simpan payload ke req.user
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: 'error', message: 'Invalid access token' });
  }
};

module.exports = authMiddleware;
