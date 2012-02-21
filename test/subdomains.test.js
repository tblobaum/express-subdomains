
// Dependencies
var assert = require('assert')
  , subdomains = require(__dirname +'/../lib/subdomains')

// Run tests
describe('express-subdomains', function () {

  it('should convert a basic subdomain into a route', function (done) {
    var args = [
      { url: '/', headers: { host: 'api.domain.com' } },
      {},
      function (req, res, next) { 
        assert.strictEqual(req.url, '/api', 'route should be `/api`')
        done()
      }
    ]
    subdomains.use('api')
    subdomains.middleware.apply({}, args)
  })
  
  it('should convert a multi level subdomain into a route', function (done) {
    var args = [
      { url: '/', headers: { host: 'api.01.vanity.domain.com' } },
      {},
      function (req, res, next) { 
        assert.strictEqual(req.url, '/api.01.vanity', 'route should be `/api.01.vanity`')
        done()
      }
    ]
    subdomains.use('api.01.vanity')
    subdomains.middleware.apply({}, args)
  })
  
  it('should convert a subdomain into a route and combine the path', function (done) {
    var args = [
      { url: '/users', headers: { host: 'api.domain.com/users' } },
      {},
      function (req, res, next) {
        assert.strictEqual(req.url, '/api/users', 'route should be `/api/users`')
        done()
      }
    ]
    subdomains.use('api')
    subdomains.middleware.apply({}, args)
  })
  
})

