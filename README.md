# express-subdomains
[![Build Status](https://secure.travis-ci.org/tblobaum/express-subdomains.png)](http://travis-ci.org/tblobaum/express-subdomains) 

Subdomains are placed at the beginning of a route by default.

## Example

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

## Tests

`npm install mocha -g` and `make test`

## Install

`npm install express-subdomains`

## License

MIT

