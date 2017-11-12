const PORT = process.env.PORT || 8080

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', express.static('static'))

app.listen(PORT)
console.log('App started on port ' + PORT)
