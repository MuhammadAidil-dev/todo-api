const Todo = require('../../model/Todo');
const { createTodo } = require('../../utils/utils');
const fs = require('fs');
const path = require('path');

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
      const { taskTitle, taskPriority, taskDescription, taskStatus } = req.body;

      const taskImage = req.file ? `/uploads/${req.file.filename}` : '';
      if (!taskTitle) {
        const error = new Error('field "task title" is required');
        error.status = 400;
        return next(error);
      }
      const objectTodo = {
        taskTitle,
        taskPriority,
        taskDescription,
        taskImage,
        taskStatus,
      };

      const { error, todo } = await createTodo(objectTodo);

      if (error) {
        return res.status(400).json({
          status: 'error',
          message: 'failed to create todo',
        });
      }

      return res.status(201).json({
        status: 'success',
        message: 'Success created todo',
        data: {
          todo,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  updateTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const fileImage = req.file;
      if (fileImage) {
        // save the new file
        updateData.taskImage = `/uploads/${fileImage.filename}`;
      }
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: id },
        { $set: updateData },
        { new: true } // properti new digunakan agar yang direturn adalah value yang sudah diupdate
      );
      if (!updatedTodo) {
        const error = new Error('Id todo not found!!');
        error.status = 404;
        return next(error);
      }

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
