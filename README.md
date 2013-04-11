# express-subdomains
[![Build Status](https://secure.travis-ci.org/tblobaum/express-subdomains.png)](http://travis-ci.org/tblobaum/express-subdomains)

Subdomains are placed at the beginning of a route by default.

## Basic example

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

## API

### domain(url)

Set the domain url to be used in all the following calls to ```use```.
Can be set to "" to match any domains.

### use(base, options)

Set a subdomain as ```base```. If ```domain``` is set, it will be added
to the subdomian to form a full host url.

The valid options are:

```newbase``` when set, this value will be used instead of base to 
rewrite the url path.

### strict()

By default, ```subdomains``` will not change the url when no rules
match. If only defined subdomain+domain matches are required,
```strict``` shall be called.

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

