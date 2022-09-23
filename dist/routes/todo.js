"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _todos = require("../controllers/todos");

var router = (0, _express.Router)();
router.post('/', _todos.createTodo);
router.get('/');
router.patch('/:id');
router["delete"]('/:id');
var _default = router;
exports["default"] = _default;