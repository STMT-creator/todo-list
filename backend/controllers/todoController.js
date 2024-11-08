const Todo = require("../models/todoModel")

const getALLTodos = async (req, res) => {
    let todos;
    try {
        todos = await Todo.find();
        if (!todos) {
            throw new Error("등록된 할일이 없습니다.")
            res.status(501).send("할일이 등록되어 있지 않습니다.")
        }
    } catch (error) {
        console.log("getALLTodos Fail : ", error)
    }
    res.status(200).json(todos);
}

const getTodo = async (req, res) => {
    const id = req.params.id;
    let todo;
    try {
        todo = await Todo.findById(id)
    } catch (error) {
        console.log("getTodo is Fail : ", error)
    }
    res.status(200).json(todo);
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
    const id = req.params.id;
    const { title, completed } = req.body;
    let todo;
    try {
        todo = await Todo.findByIdAndUpdate(id, {
            title,
            completed
        });
    } catch (error) {
        console.log("updateTodo is Fail : ", error)
    }
    res.status(200).json(todo);
}

const removeTodo = async (req, res) => {
    const id = req.params.id;
    let todo;
    try {
        todo = await Todo.deleteOne({_id: id})
    } catch (error) {
        console.log("deleteTodo is Fail : ", error)
    }
    res.status(200).json(todo);
}

module.exports = { getALLTodos, getTodo, addTodos, updateTodo, removeTodo };