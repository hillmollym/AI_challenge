// create web server
// 1. load modules
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

// 2. create app
const app = express()
const port = 3000

// 3. use middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 4. view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// 5. router setup
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/comments', (req, res) => {
  const comment = req.body.comment
  const data = {
    comment: comment,
    date: new Date()
  }

  fs.readFile('./comments.json', (err, dataBuffer) => {
    if (err) {
      console.log(err)
    } else {
      const comments = JSON.parse(dataBuffer.toString())
      comments.push(data)
      fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          console.log(err)
        } else {
          res.redirect('/comments')
        }
      })
    }
  })
})

app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, dataBuffer) => {
    if (err) {
      console.log(err)
    } else {
      const comments = JSON.parse(dataBuffer.toString())
      res.render('comments', {comments: comments})
    }
  })
})

// 6. start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})