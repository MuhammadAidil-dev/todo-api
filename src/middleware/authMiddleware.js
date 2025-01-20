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
    console.log(decoded);
    req.user = decoded; //simpan payload ke req.user
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Tangkap error saat token sudah expired
      return res
        .status(401)
        .json({
          status: 'error',
          message: 'Access token expired, please login again',
        });
    }
    return res
      .status(401)
      .json({ status: 'error', message: 'Invalid access token' });
  }
};

module.exports = authMiddleware;
