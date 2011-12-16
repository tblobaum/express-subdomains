express-subdomains
==================

Subdomains are appended to the beginning of a route by default.

Example
-------

```javascript

    var subdomains = require('express-subdomains')
        , express = require('express')
        , app = Express.createServer()

    // example: api.example.com/user -> '/api/user'
    subdomains.use('api') // -> '/api/'
    subdomains.use('other.vanity.domain') // -> '/other.vanity.domain/'
    
    app.use(subdomains.middleware)
    
    // ...
    app.listen()
    
````

Install
-------

`npm install express-subdomains`

