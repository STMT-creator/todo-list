const express = require("express"); // express 패키지 불러오기
const router = express.Router(); // 라우터 클래스를 이용해 라우터 객채 생성
const { getALLTodos, getTodo, updateTodo, addTodos, removeTodo } = require("../controllers/todoController")

router
    .route("/")
    .get(getALLTodos)
    .post(addTodos);

router
    .route("/:id")
    .get(getTodo)
    .put(updateTodo)
    .delete(removeTodo);

module.exports = router; //다른 위치의 js파일에서 router 객체를 불러올수 있음.

// let todos = [
//     {
//         userId: 1,
//         id: 1,
//         title: "deelectus aut autem",
//         date: new Date("2024-11-01"),
//         completed: false
//     },
//     {
//         userId: 1,
//         id: 2,
//         title: "gone with wind",
//         date: new Date("2024-11-01"),
//         completed: false
//     },
//     {
//         userId: 1,
//         id: 3,
//         title: "the perfect espresso",
//         date: new Date("2024-11-01"),
//         completed: true
//     },
// ];