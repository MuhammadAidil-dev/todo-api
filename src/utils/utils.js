const Todo = require('../model/Todo');

const createTodo = async (todo) => {
  const todoObject = await Todo.create({
    _id: `todo-${+new Date()}`,
    todo: todo,
  });
  return todoObject;
};

module.exports = { createTodo };
