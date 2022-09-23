"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _todos = require("../controllers/todos");

var router = (0, _express.Router)();
router.post('/', _todos.createTodo);
router.get('/', _todos.getTodos);
router.patch('/:id', _todos.updateTodo);
router["delete"]('/:id', _todos.deleteTodo);
var _default = router;
exports["default"] = _default;