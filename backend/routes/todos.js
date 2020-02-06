const router = require("express").Router();
let Todo = require("../models/todo.model");

router.route("/").get((req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json("Error", err));
});

router.route("/:id").get((req, res) => {
  Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json("Error", err));
});

router.route("/add").post((req, res) => {
  let todo = new Todo(req.body);
  todo.save().then(todo => {
    res
      .status(200)
      .json({ todo: "Added successfully!" })
      .catch(err => res.status(400).json("Adding new todo failed.", err));
  });
});

router.route("/update/:id").post((req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    !todo
      ? res.status(400).send("Data isn't found")
      : (todo_description = req.body.todo_description);
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;

    todo
      .save()
      .then(todo => res.json("Todo updated"))
      .catch(err => res.status(400).send("Update not possible."));
  });
});

router.route("/:id").delete((req, res) => {
  let id = req.params.id;
  Todo.findByIdAndDelete(id)
    .then(() => res.json("Todo deleted"))
    .catch(err => res.status(400).json("Err", err));
});

module.exports = router;
