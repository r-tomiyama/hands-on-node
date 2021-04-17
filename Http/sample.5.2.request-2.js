const http = require('http');

http.request('http://localhost:3000/api/todos?completed=true', res => {
    let responseData = ''
    console.log('statusCode', res.statusCode)
    res.on('data', chunk => responseData += chunk)
    res.on('end', () => console.log('responseData', JSON.parse(responseData)))
}).end()
