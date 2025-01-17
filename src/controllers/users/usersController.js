const User = require('../../model/User');
const { createToken } = require('../../utils/utils');
const bcrypt = require('bcrypt');

const usersController = {
  getAllUsers: (req, res, next) => {
    return res.json({ message: 'success' });
  },
  addUser: async (req, res, next) => {
    const { fullname, username, email, password } = req.body;

    try {
      const existUser = await User.findOne({
        $or: [{ email: email }, { username: username }],
      });
      if (existUser) {
        let error;
        if (existUser.email === email) {
          error = new Error('Email already exist');
          error.status = 400;
        }
        if (existUser.username === username) {
          error = new Error('Username already exist');
          error.status = 400;
        }
        throw error;
      }

      const user = await User.create({ fullname, username, email, password });
      if (!user) {
        return res.status(500).json({ message: 'Failed to created user' });
      }

      return res
        .status(201)
        .json({ status: 'success', message: 'Success to created user', user });
    } catch (error) {
      next(error);
    }
  },
  loginUser: async (req, res, next) => {
    const { username, password } = req.body;

    try {
      const userLogin = await User.findOne({ username: username });
      if (!userLogin) {
        return res
          .status(404)
          .json({ status: 'not found', message: 'user not found' });
      }

      //verify password
      const isValidPassword = await bcrypt.compare(
        password,
        userLogin.password
      );
      if (!isValidPassword) {
        return res
          .status(401)
          .json({ status: 'error', message: 'Invalid credentials' });
      }

      const authToken = createToken(userLogin);

      return res
        .status(200)
        .json({
          status: 'success',
          message: 'Successfuly login',
          userLogin,
          authToken,
        });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = usersController;
