const Todo = require('../model/Todo');
const jwt = require('jsonwebtoken');

const createTodo = async ({
  taskTitle,
  taskPriority,
  taskDescription,
  taskImage,
  taskStatus,
  user,
}) => {
  const todoObject = await Todo.create({
    taskTitle,
    taskPriority,
    taskDescription,
    taskImage,
    taskStatus,
    user,
  });

  return { error: false, todo: todoObject };
};

const createToken = (user) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
  return token;
};

module.exports = { createTodo, createToken };
