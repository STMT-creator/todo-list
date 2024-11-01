const express = require('express')
const app = express()
const port = 3000 // process.env.PORT || 3000

/*http 요청 : get, post, put, delete, (patch) */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
let todos = [
  {
    userId: 1,
    id: 1,
    title: " deelectus aut autem",
    completed: false
  },
  {
    userId: 1,
    id: 2,
    title: "gone with wind",
    completed: false
  },
  {
    userId: 1,
    id: 3,
    title: " the perfect espresso",
    completed: false
  },
];

app.get("/todos/:id", (req, res) => {
  // 파라미터 변수 : 문자로 들어옴
  const foundOne = todos.find(todo => todo.id === parseInt(req.params.id))
  res.status(200).json(foundOne);
});

app.post("/todos", (req, res) => {
  const { userId, id, title, completed } = req.body;
  todos = [...todos, {
    "userId": userId,
    "id": id,
    "title": title,
    "completed": completed
  }];
  console.log(todos)
})

app.put("/todos", (req, res) => {
  const { id, title, completed } = req.body;
  const foundOne = todos.find(todo => todo.id === id);
  // update field
  foundOne.title = title;
  foundOne.completed = completed;
  res.status(200).json(todos);
})

app.delete("/todos", (req, res) => {
  let { id } = req.body;
  console.log(id)
  todos.splice(--id, 1);
  res.status(200).json(todos);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})