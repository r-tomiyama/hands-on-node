const http = require('http');

const todos = [
    { id: 1, title: 'ほげ', completed: true },
    { id: 2, title: 'ふが', completed: false }
]

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    console.log(url)
    if (url.pathname === '/api/todos') {
        if (req.method === 'GET') {
            const completedFilter = new Boolean(url.searchParams.get('completed'))
            console.log(`filter: ${completedFilter}`)
            res.setHeader('Content-Type', 'application/json')
            const result = completedFilter == null ? todos : todos.filter(v => v.completed == completedFilter);
            return res.end(JSON.stringify(result))
        }
        res.statusCode = 405
    } else {
        res.statusCode = 404
    }
    res.end()
}).listen(3000)
console.log('server start')
