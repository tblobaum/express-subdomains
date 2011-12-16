
/*!
 * express-subdomains
 * Copyright(c) Thomas Blobaum
 * MIT Licensed
 */

var subs = []

module.exports = {
  use: function (base, options) {
    options = options || {}
    subs.push({
      base:base, 
      options:options
    })
  },
  middleware: function (req, res, next) {
    subs.forEach(function(subdomain) {
      if (subdomain.base.test(req.headers.host)) {
        req.url = '/' + subdomain.base + req.url
        return next()
      }
    })
    return next()
  }
}

