const Todo = require('../model/Todo');

const createTodo = async (todo) => {
  const todoObject = await Todo.create({
    taskTitle: todo,
  });
  return todoObject;
};

module.exports = { createTodo };
