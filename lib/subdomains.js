/*!
 * express-subdomains
 * Copyright(c) Thomas Blobaum
 * MIT Licensed
 */

var domain = "",
  subs = [{ base: '.' }],
  Sequence = require('sequence');

module.exports = {
  use: function (base, options) {
    subs.unshift({
      base: base,
      options: options || {}
    });
    return this;
  },
  domain: function (url) {
    domain = url;
    return this;
  },
  middleware: function (req, res, next) {
    forEachAsync(subs, function (fn, item, i, arr) {
      var regexp = item.base;
      if (regexp !== '.') { regexp = "^" + regexp + "\\."; }
      if (domain) { regexp = regexp + domain + "(:[0-9]*)?$"; }
      if (RegExp(regexp, "gi").test(req.headers.host)) {
        if (item.base !== '.') {
          if (req.url === '/') {
            req.url = '';
          }
          req.url = '/' + item.base + req.url;
        }
        next();
      } else {
        fn();
      }
    });
  }
};

function forEachAsync(arr, callback) {
  var sequence = Sequence();
  function handleItem(item, i, arr) {
    sequence.then(function (next) {
      callback(next, item, i, arr);
    });
  }
  arr.forEach(handleItem);
  return sequence;
}
