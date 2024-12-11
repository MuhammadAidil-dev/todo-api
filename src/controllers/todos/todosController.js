const Todo = require('../../model/Todo');
const { createTodo } = require('../../utils/utils');

const todosController = {
  getAllTodos: async (req, res, next) => {
    try {
      const todos = await Todo.find();

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

  getTodoById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findOne({ _id: id });
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

  addTodo: async (req, res, next) => {
    try {
      const { todo: todoInput } = req.body;
      if (!todoInput) {
        const error = new Error('field "todo" is required');
        error.status = 400;
        return next(error);
      }
      const newTodo = await createTodo(todoInput);

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

  updateTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { todo: todoInput } = req.body;
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: id },
        { $set: { todo: todoInput } },
        { new: true }
      );
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

  deleteTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const todoIndex = await Todo.findOneAndDelete({ _id: id });
      if (!todoIndex) {
        const error = new Error('Todo not found!!');
        error.status = 404;
        return next(error);
      }
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
