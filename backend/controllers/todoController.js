const Todo = require("../models/todoModel")

const getALLTodos = async (req, res) => {
    res.status(200).json("todos");
}

const getTodo = async (req, res) => {
    const foundOne = todos.find(todo => todo.id === parseInt(req.params.id))
    res.status(200).json(foundOne);
}

const addTodos = async (req, res) => {
    const { title, completed } = req.body;
    try {
        const todo = await Todo.create({
            title,
            completed
        })
    } catch (error) {
        console.log("addTodo is Fail : ", error)
    }
    res.status(200).send("add Todo");
}

const updateTodo = async (req, res) => {
    const { id, title, completed } = req.body;
    const foundOne = todos.find(todo => todo.id === id);
    foundOne.title = title;
    foundOne.completed = completed;
    res.status(200).json(todos);
}

const removeTodo = async (req, res) => {
    let { id } = req.body;
    console.log(id)
    todos.splice(--id, 1);
    res.status(200).json(todos);
}

module.exports = { getALLTodos, getTodo, addTodos, updateTodo, removeTodo };