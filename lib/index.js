'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.match = match;
exports.op = exports.lt = exports.gt = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function useHandler(handler, matchValue) {
  return typeof handler === 'function' ? handler(matchValue) : handler;
}

function match() {
  for (var _len = arguments.length, patterns = new Array(_len), _key = 0; _key < _len; _key++) {
    patterns[_key] = arguments[_key];
  }

  return function (obj) {
    for (var i = 0; i < patterns.length - 1; i += 2) {
      if (matchAny(patterns[i], obj)) return useHandler(patterns[i + 1], obj);
    }

    if (patterns.length % 2 === 1) return useHandler(patterns[patterns.length - 1], obj);
    return null;
  };
}

;

function matchObject(pat, obj) {
  return Object.keys(pat).reduce(function (totalMatch, prop) {
    return totalMatch && matchAny(pat[prop], obj[prop]);
  }, true);
}

function matchAny(v1, v2) {
  if (_typeof(v1) === 'object' && _typeof(v2) == 'object') {
    return matchObject(v1, v2);
  } else if (typeof v1 === 'function') {
    return v1(v2);
  } else if (v1 !== v2) {
    return false;
  }

  return true;
} // Useful Matchlets


var gt = function gt(c) {
  return function (n) {
    return n > c;
  };
};

exports.gt = gt;

var lt = function lt(c) {
  return function (n) {
    return n < c;
  };
};

exports.lt = lt;

var op = function op(c) {
  return function (n) {
    return c.includes(n);
  };
}; // Promise chaining


exports.op = op;

if (!Promise.prototype.match) {
  Object.defineProperty(Promise.prototype, 'match', {
    value: function value() {
      return this.then(match.apply(void 0, arguments));
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
}