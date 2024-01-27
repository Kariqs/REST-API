const Todo = require("../model/todo-model");

async function getTodos(req, res, next) {
  let todos;
  try {
    todos = await Todo.fetchTodos();
  } catch (error) {
    return next(error);
  }

  res.json({
    todos: todos,
  });
}

async function addTodo(req, res, next) {
  const todoText = req.body.text;

  const todo = new Todo(todoText);
  let insertedId;
  try {
    const result = await todo.save();
    insertedId = result.insertedId;
  } catch (error) {
    return next(error);
  }

  todo.id = insertedId.toString();

  res.status(200).json({
    message: "Todo added successfully.",
    createdTodo: todo,
  });
}

async function updateTodo(req, res, next) {
  const todoId = req.params.id;
  const newTodoText = req.body.text;

  const todo = new Todo(newTodoText, todoId);
  try {
    await todo.save();
  } catch (error) {
    return next(error);
  }

  res.json({
    message: "Todo updated successfully.",
    updatedTodo: todo,
  });
}

async function deleteTodo(req, res, next) {
    const todoId = req.params.id;
  
    const todo = new Todo(null, todoId);
    try {
      await todo.delete();
    } catch (error) {
      return next(error);
    }
  
    res.json({
      message: "Todo deleted successfully.",
    });
  }


module.exports = {
  getTodos: getTodos,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
