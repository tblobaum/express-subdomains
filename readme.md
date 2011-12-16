express-subdomains
==================

Subdomains are placed at the beginning of a route by default.

Example
-------

```javascript

var subdomains = require('express-subdomains')
    , express = require('express')
    , app = Express.createServer()

// example: api.example.com/user -> '/api/user'

subdomains
  .use('api')
  .use('other.vanity.domain')

app.use(subdomains.middleware)

app.get('/api/user' function (req, res, next) {
  // ..
})

app.listen()
    
````

Install
-------

`npm install express-subdomains`

License
-------

MIT

