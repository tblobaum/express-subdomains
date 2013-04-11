
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
    subdomains.init();
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
    subdomains.init();
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
    subdomains.init();
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
    subdomains.init();
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
    subdomains.init();
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
    subdomains.init();
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
    subdomains.init();
    subdomains.domain('domain.com').use('api')
    subdomains.middleware.apply({}, args)
  })

  it('should not match "." within domain with different domain into a route', function (done) {
    var req = { url: '/', headers: { host: 'api.otherxdomain.com' } },
      args = [
      req,
      {},
      function () {
        assert.strictEqual(req.url, '/', 'route should be `/`')
        done()
      }
    ]
    subdomains.init();
    subdomains.domain('other.domain.com').use('api')
    subdomains.middleware.apply({}, args)
  })

  it('should convert a subdomain and first domain into a route', function (done) {
    var req = { url: '/', headers: { host: 'api.domain.com' } },
      args = [
      req,
      {},
      function () {
        assert.strictEqual(req.url, '/api', 'route should be `/`')
        done()
      }
    ]
    subdomains.init();
    subdomains.domain('domain.com').use('api')
    subdomains.domain('otherdomain.com').use('www')
    subdomains.middleware.apply({}, args)
  })

  it('should convert a subdomain and last domain a route', function (done) {
    var req = { url: '/', headers: { host: 'api.domain.com' } },
      args = [
      req,
      {},
      function () {
        assert.strictEqual(req.url, '/api', 'route should be `/`')
        done()
      }
    ]
    subdomains.init();
    subdomains.domain('otherdomain.com').use('www')
    subdomains.domain('domain.com').use('api')
    subdomains.middleware.apply({}, args)
  })

  it('should bypass any non matching route', function (done) {
    var req = { url: '/', headers: { host: 'api.domain.com' } },
      args = [
      req,
      {
        send: function (code) {
          assert.strictEqual(code, 404, 'exit code should not be 404')
          done()
        }
      },
      function () {
        assert.strictEqual(req.url, '/', 'route should be `/`')
        done()
      }
    ]
    subdomains.init();
    subdomains.domain('domain.com').use('api2')
    subdomains.middleware.apply({}, args)
  })

  it('should not bypass any non matching route if strict is set', function (done) {
    var req = { url: '/', headers: { host: 'api2.otherdomain.com' } },
      args = [
      req,
      {
        send: function (code) {
          assert.strictEqual(code, 404, 'code should be 404')
          done()
        }
      },
      function () {
        assert.fail(req.url, 'none', 'route should not match')
        done()
      }
    ]
    subdomains.init();
    subdomains.domain('otherdomain.com').use('api').strict()
    subdomains.middleware.apply({}, args)
  })

  it('should convert a matching subdomain into a new route', function (done) {
    var req = { url: '/', headers: { host: 'api.domain.com' } },
      res = {},
      next = function () {
        assert.strictEqual(req.url, '/api2', 'route should be chaged to `/api2`');
        done();
      },
      args = [req, res, next];
    subdomains.init();
    subdomains.domain('domain.com').use('api', { newbase: 'api2' });
    subdomains.middleware.apply({}, args);
  });

})
