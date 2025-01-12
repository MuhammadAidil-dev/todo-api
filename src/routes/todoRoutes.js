const express = require('express');
const todosController = require('../controllers/todos/todosController');
const upload = require('../middleware/uploadFileHandler');
const deleteFileMiddleware = require('../middleware/deleteFileMiddleware');
const routes = express.Router();

// prefik : /todos

// GET all todo
routes.get('/', todosController.getAllTodos);

// GET specific todo by ID
routes.get('/:id', todosController.getTodoById);

// POST add new todo
routes.post('/', upload.single('taskImage'), todosController.addTodo);

// PUT update a todo by ID
routes.put(
  '/:id',
  upload.single('fileImage'),
  deleteFileMiddleware,
  todosController.updateTodo
);

// DELETE a todo by ID
routes.delete('/:id', deleteFileMiddleware, todosController.deleteTodo);

module.exports = routes;
