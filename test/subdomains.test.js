
// Dependencies
var assert = require('assert')
  , subdomains = require(__dirname +'/../lib/subdomains')

// Run tests
describe('express-subdomains', function () {

  it('should convert a basic subdomain into a route', function (done) {
    var req = { url: '/', headers: { host: 'api.domain.com' } },
      args = [
      req,
      {},
      function () {
        assert.strictEqual(req.url, '/api', 'route should be `/api`')
        done()
      }
    ]
    subdomains.use('api')
    subdomains.middleware.apply({}, args)
  })

  it('should convert a multi level subdomain into a route', function (done) {
    var req = { url: '/', headers: { host: 'api.01.vanity.domain.com' } },
      args = [
      req,
      {},
      function () {
        assert.strictEqual(req.url, '/api.01.vanity', 'route should be `/api.01.vanity`')
        done()
      }
    ]
    subdomains.use('api.01.vanity')
    subdomains.middleware.apply({}, args)
  })

  it('should convert a subdomain into a route and combine the path', function (done) {
    var req = { url: '/users', headers: { host: 'api.domain.com/users' } },
      args = [
      req,
      {},
      function () {
        assert.strictEqual(req.url, '/api/users', 'route should be `/api/users`')
        done()
      }
    ]
    subdomains.use('api')
    subdomains.middleware.apply({}, args)
  })

  it('should not convert any start match that is not a subdomain into a route', function (done) {
    var req = { url: '/', headers: { host: 'apinew.domain.com' } },
      args = [
      req,
      {},
      function () {
        assert.strictEqual(req.url, '/', 'route should be `/`')
        done()
      }
    ]
    subdomains.use('api')
    subdomains.middleware.apply({}, args)
  })

  it('should not convert any partial match into a route', function (done) {
    var req = { url: '/', headers: { host: 'newapi.domain.com' } },
      args = [
      req,
      {},
      function () {
        assert.strictEqual(req.url, '/', 'route should be `/`')
        done()
      }
    ]
    subdomains.use('api')
    subdomains.middleware.apply({}, args)
  })

  it('should convert a subdomain and domain into a route', function (done) {
    var req = { url: '/', headers: { host: 'api.domain.com' } },
      args = [
      req,
      {},
      function () {
        assert.strictEqual(req.url, '/api', 'route should be `/api`')
        done()
      }
    ]
    subdomains.domain('domain.com').use('api')
    subdomains.middleware.apply({}, args)
  })

  it('should not convert a subdomain with different domain into a route', function (done) {
    var req = { url: '/', headers: { host: 'api.otherdomain.com' } },
      args = [
      req,
      {},
      function () {
        assert.strictEqual(req.url, '/', 'route should be `/`')
        done()
      }
    ]
    subdomains.domain('domain.com').use('api')
    subdomains.middleware.apply({}, args)
  })

})
