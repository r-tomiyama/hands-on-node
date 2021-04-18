'use strict'
const express = require('express')
const app = express()
app.use(express.json())

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

let id = 2

app.post('/api/todos', (req, res, next) => {
    const { title } = req.body
    if (typeof title !== 'string' || !title) {
        const err = new Error('title is required')
        err.statusCode = 400
        return next(err)
    }
    const todo = { id: id += 1, title, completed: false }
    todos.push(todo)
    res.status(201).json(todo)
})

app.use('/api/todos/:id(\\d+)', (req, res, next) => {
    const id = Number(req.params.id)
    const todo = todos.find(todo => todo.id === id)

    if (!todo) {
        const err = new Error('todo is not found')
        err.statusCode = 404
        return next(err)
    }
    req.todo = todo
    next()
})

app.route('/api/todos/:id(\\d+)/completed')
    .put((req, res) => {
        req.todo.completed = true
        res.status(200).json(req.todo)
    })
    .delete((req, res) => {
        req.todo.completed = false
        res.status(200).json(req.todo)
    })

app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.statusCode || 500).json({error: err.message})
})

app.delete('/api/todos/:id(\\d+)/', (req, res, next) => {
    todos = todos.filter(todo => todo == req.todo)
    res.status(200).end()
})

app.listen(3000)

const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })

nextApp.prepare().then(
    () => app.get('*', nextApp.getRequestHandler()),
    err => {
        console.error(err),
            process.exit(1)
    }
)
