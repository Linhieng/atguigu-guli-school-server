"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTodo = exports.getTodos = exports.deleteTodo = exports.createTodo = void 0;

var _todo = require("../models/todo");

var TODOS = [];

var createTodo = function createTodo(req, res) {
  var text = req.body.text;
  var newTodo = new _todo.Todo(Math.random().toString(), text);
  TODOS.push(newTodo);
  res.status(201).json({
    message: 'Created the todo',
    createdTodo: newTodo
  });
};

exports.createTodo = createTodo;

var getTodos = function getTodos(req, res) {
  res.json({
    todos: TODOS
  });
};

exports.getTodos = getTodos;

var updateTodo = function updateTodo(req, res) {
  var todoId = req.params.id;
  var updateText = req.body.text;
  var todoIndex = TODOS.findIndex(function (todo) {
    return todo.id === todoId;
  });

  if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }

  TODOS[todoIndex] = new _todo.Todo(TODOS[todoIndex].id, updateText);
  res.json({
    message: 'Updated!',
    updatedTodo: TODOS[todoIndex]
  });
};

exports.updateTodo = updateTodo;

var deleteTodo = function deleteTodo(req, res) {
  var todoId = req.params.id;
  var todoIndex = TODOS.findIndex(function (todo) {
    return todo.id === todoId;
  });

  if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }

  TODOS.splice(todoIndex, 1);
  res.json({
    message: 'Todo deleted!'
  });
};

exports.deleteTodo = deleteTodo;