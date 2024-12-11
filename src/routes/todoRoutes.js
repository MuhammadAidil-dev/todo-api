const express = require('express');
const todosController = require('../controllers/todos/todosController');
const routes = express.Router();

// prefik : /todos

// GET all todo
routes.get('/', todosController.getAllTodos);

// GET specific todo by ID
routes.get('/:id', todosController.getTodoById);

// POST add new todo
routes.post('/', todosController.addTodo);

// PUT update a todo by ID
routes.put('/:id', todosController.updateTodo);

// DELETE a todo by ID
routes.delete('/:id', todosController.deleteTodo);

module.exports = routes;
