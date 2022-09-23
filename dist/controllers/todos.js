"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTodo = void 0;

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