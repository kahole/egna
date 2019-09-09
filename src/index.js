'use strict';

function match(...patterns) {

  return obj => {
    for (var i = 0; i < patterns.length - 1; i += 2) {
      if (matchAny(patterns[i], obj))
        return patterns[i + 1](obj);
    }
    if (patterns.length % 2 === 1)
      return patterns[patterns.length - 1](obj);
    return null;
  };
};

function matchObject(pat, obj) {

  return Object.keys(pat).reduce((totalMatch, prop) => {
    return totalMatch && matchAny(pat[prop], obj[prop]);
  }, true);
}

function matchAny(v1, v2) {

  if ((v1 != null && v1.constructor === Object) &&
    (v2 != null && v2.constructor === Object)) {
    return matchObject(v1, v2);
  }
  else if (typeof v1 === 'function') {
    return v1(v2);
  }
  else if (v1 !== v2) {
    return false;
  }
  return true;
}

// Useful Matchlets
const gt = (c) => ((n) => n > c);
const lt = (c) => ((n) => n < c);
const op = (c) => ((n) => c.includes(n));

// Promise chaining
if(!Promise.prototype.match) {
  Object.defineProperty(Promise.prototype, 'match', {
    value: function(...patterns) {
      return this.then(
        match(...patterns)
      );
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
}

export { match, gt, lt, op };
