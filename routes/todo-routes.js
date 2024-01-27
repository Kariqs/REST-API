const express = require("express");
const todoController = require("../controller/todo-controller");
const router = express.Router();

router.get("/todos", todoController.getTodos);
router.post("/todos", todoController.addTodo);
router.patch("/todos/:id", todoController.updateTodo);
router.delete("/todos/:id", todoController.deleteTodo);

module.exports = router;
