const validateUserInput = async (req, res, next) => {
  const { fullname, username, email, password } = req.body;
  console.log(req.body);
  if (!fullname) {
    return res.status(400).json({ message: 'Field fullname is required' });
  }
  if (!username) {
    return res.status(400).json({ message: 'Field username is required' });
  }
  if (!email) {
    return res.status(400).json({ message: 'Field email is required' });
  }
  if (!password) {
    return res.status(400).json({ message: 'Field password is required' });
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isEmailValid) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  next();
};

module.exports = validateUserInput;
