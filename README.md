# express-subdomains
[![Build Status](https://secure.travis-ci.org/tblobaum/express-subdomains.png)](http://travis-ci.org/tblobaum/express-subdomains) 

Subdomains are placed at the beginning of a route by default.

## Example

```javascript

var subdomains = require('express-subdomains')
    , express = require('express')
    , app = Express.createServer();

// example: api.example.com/user -> '/api/user'

subdomains
  .use('api')
  .use('other.vanity.domain');

// Place this line before 
// app.use(app.router)
app.use(subdomains.middleware);

// Path for domain/api/user and api.domain/user
app.get('/api/user' function (req, res, next) {
  // ..
})

app.listen();
    
````

## Testing locally

Add the following line(s) to your /etc/hosts file
```
127.0.0.1   api.localhost
127.0.0.1   other.vanity.domain.localhost
```

## Tests

`npm install mocha -g` and `make test`

## Install

`npm install express-subdomains`

## License

MIT

