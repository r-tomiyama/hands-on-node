'use strict'
const express = require('express')
const app = express()

let todos = [
    { id: 1, title: 'ほげ', completed: true },
    { id: 2, title: 'ふが', completed: false }
]

app.get('/api/todos', (req, res) => {
    if (!req.query.completed) {
        return res.json(todos)
    }
    const completed = req.query.completed === 'true'
    res.json(todos.filter(todo => todo.completed == completed))
})
app.listen(3000)
