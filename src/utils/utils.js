const Todo = require('../model/Todo');

const createTodo = async ({
  taskTitle,
  taskPriority,
  taskDescription,
  taskImage,
  taskStatus,
}) => {
  const todoObject = await Todo.create({
    taskTitle,
    taskPriority,
    taskDescription,
    taskImage,
    taskStatus,
  });

  return { error: false, todo: todoObject };
};

module.exports = { createTodo };
