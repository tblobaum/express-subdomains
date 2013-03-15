/*!
 * express-subdomains
 * Copyright(c) Thomas Blobaum
 * MIT Licensed
 */

var domain,
  subs,
  Sequence = require('sequence');

module.exports = {
  init: function () {
    domain = "";
    subs = [{ base: '.', options: {} }];
  },
  use: function (base, options) {
    subs.unshift({
      base: base,
      domain: domain ? domain : "",
      options: options || {}
    });
    return this;
  },
  domain: function (url) {
    domain = url;
    return this;
  },
  strict: function () {
    subs.slice(-1)[0].options.strict = true;
    return this;
  },
  middleware: function (req, res, next) {
    forEachAsync(subs, function (fn, item, i, arr) {
      if (item.base !== '.') {
        var regexp = "^" + item.base + "\\.";
        if (item.domain) {
          regexp += item.domain.replace(".", "\\.") + "(:[0-9]*)?$";
        }
        if (RegExp(regexp, "gi").test(req.headers.host)) {
          if (req.url === '/') {
            req.url = '';
          }
          req.url = '/' + item.base + req.url;
          next();
        } else {
          fn();
        }
      } else {
        if (!item.options.strict) {
          next();
        } else {
          res.send(404);
        }
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

module.exports.init();
