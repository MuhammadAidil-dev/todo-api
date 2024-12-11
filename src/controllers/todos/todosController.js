const todos = require('../../global/data-todos');
const { createTodo } = require('../../utils/utils');

const todosController = {
  getAllTodos: (req, res, next) => {
    try {
      return res.status(200).json({
        status: 'success',
        message: 'Success get all todos',
        data: {
          todos,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getTodoById: (req, res, next) => {
    try {
      const { id } = req.params;
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) {
        const error = new Error('Todo not found!!');
        error.status = 404;
        return next(error);
      }

      return res.status(200).json({
        status: 'success',
        message: 'Successfuly get todo',
        data: {
          todo,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  addTodo: (req, res, next) => {
    try {
      const { todo: todoInput } = req.body;
      if (!todoInput) {
        const error = new Error('field "todo" is required');
        error.status = 400;
        return next(error);
      }
      const newTodo = createTodo(todoInput);
      todos.push(newTodo);

      return res.status(201).json({
        status: 'success',
        message: 'Success created todo',
        data: {
          todo: newTodo,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  updateTodo: (req, res, next) => {
    try {
      const { id } = req.params;
      const { todo: todoInput } = req.body;
      const updatedTodo = todos.find((todo) => todo.id === id);
      if (!updatedTodo) {
        const error = new Error('Id todo not found!!');
        error.status = 404;
        return next(error);
      }

      updatedTodo.todo = todoInput;
      updatedTodo.updatedAt = new Date().toISOString();
      return res.status(200).json({
        status: 'success',
        message: 'Todo successfuly updated',
        data: {
          todo: updatedTodo,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  deleteTodo: (req, res, next) => {
    try {
      const { id } = req.params;
      const todoIndex = todos.findIndex((todo) => todo.id === id);
      if (todoIndex === -1) {
        const error = new Error('Todo not found!!');
        error.status = 404;
        return next(error);
      }

      todos.splice(todoIndex, 1);
      return res.status(200).json({
        status: 'success',
        message: 'Success deleted todo',
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = todosController;
