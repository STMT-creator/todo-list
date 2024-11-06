const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // process.env.PORT || 3000
const cors = require("cors");
const dbConnect = require("./config/db")

dbConnect();

//const todoRouter = require("./routes/todoRouter");

/*Module System 다른 js파일에서 읽어내서 쓸수 있는것*/
/*require() 가져오기 module.exports() 내보내기*/
/*http 요청 : get, post, put, delete, (patch) */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({}))

app.use("/todos", require("./routes/todoRouter"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})