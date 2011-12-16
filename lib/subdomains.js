
/*!
 * express-subdomains
 * Copyright(c) Thomas Blobaum
 * MIT Licensed
 */

var subs = [{base:'.'}]
var Sequence = require('sequence');
  
module.exports = {
  use: function (base, options) {
    options = options || {}
    subs.unshift({
      base:base, 
      options:options
    })
    return this
  },
  middleware: function (req, res, next) {
  
    forEachAsync(subs, function(fn, item, i, arr) {
    
      if (RegExp(item.base, "gi").test(req.headers.host)) {
        if (item.base !== '.') req.url = '/' + item.base + req.url
        next()
      }
      
      else {
        fn()
      }
      
    })
    
  }
}

function forEachAsync (arr, callback) {
  var sequence = Sequence()

  function handleItem(item, i, arr) {
    sequence.then(function (next) {
      callback(next, item, i, arr)
    })
  }

  arr.forEach(handleItem)

  return sequence
}

