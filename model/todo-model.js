const { ObjectId } = require("mongodb");
const db = require("../data/database");
const { text } = require("express");

class Todo {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }

  static async fetchTodos() {
    const todoDocuments = await db
      .getDatabase()
      .collection("todos")
      .find()
      .toArray();

    return todoDocuments.map(function (todoDocuments) {
      return new Todo(todoDocuments.text, todoDocuments ._id);
    });
  }

  save() {
    if (this.id) {
      return db
        .getDatabase()
        .collection("todos")
        .updateOne(
          { _id: new ObjectId(this.id) },
          { $set: { text: this.text } }
        );
    } else {
      return db.getDatabase().collection("todos").insertOne({ text: this.text });
    }
  }

  delete() {
    if (!this.id) {
      throw new Error("The todo you are trying to delete does not exist.");
    }
    return db
      .getDatabase()
      .collection("todos")
      .deleteOne({ _id: new ObjectId(this.id) });
  }
}

module.exports = Todo;
