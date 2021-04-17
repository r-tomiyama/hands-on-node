```
-> % node --experimental-repl-await

> require('isomorphic-fetch')
[Function]
> fetch
[Function]
> await fetch('http://localhost:3000/api/todos')
# await fetch('http://localhost:3000/api/todos?completed=true')
# > await fetch('http://localhost:3000/api/todos', {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify({title: 'ぽよ'})})
Response {...}
> console.log(_.status, await _.json())
200 [ { id: 1, title: 'ほげ', completed: true }, { id: 2, title: 'ふが', completed: false } ]
```
