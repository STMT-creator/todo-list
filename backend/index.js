const express = require('express')
const app = express()
const port = 3000 // process.env.PORT || 3000

/*http 요청 : get, post, put, delete, (patch) */
const todos = [];
app.get('/todos', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})