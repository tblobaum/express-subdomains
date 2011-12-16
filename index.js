
/*!
 * express-subdomains
 * Copyright(c) Thomas Blobaum
 * MIT Licensed
 */

var subs = [{base:'.'}]

module.exports = {
  use: function (base, options) {
    options = options || {}
    subs.unshift({
      base:base, 
      options:options
    })
  },
  middleware: function (req, res, next) {
    subs.forEach(function(subdomain) {
      if (RegExp(subdomain.base, "gi").test(req.headers.host)) {
        req.url = '/' + subdomain.base + req.url
        return next()
      }
    })
  }
}

