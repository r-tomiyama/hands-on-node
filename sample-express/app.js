'use strict'
const express = require('express')
const app = express()

let todos = [
    { id: 1, title: 'ほげ', completed: true },
    { id: 2, title: 'ふが', completed: false }
]

app.get('/api/todos', (req, res) => res.json(todos))
app.listen(3000)
