'use strict';

module.exports = function () {
    for (var _len = arguments.length, patterns = Array(_len), _key = 0; _key < _len; _key++) {
        patterns[_key] = arguments[_key];
    }

    return function (obj) {

        for (var i = 0; i < patterns.length; i++) {

            var pat = patterns[i];
            var matches = true;

            if (typeof pat !== 'function') {
                matches = matchAny(pat, obj);
                i += 1;
            }

            var fun = patterns[i];

            if (matches) return fun.apply(null, [obj]);
        }
    };
};

function matchObject(pat, obj) {

    return Object.keys(pat).reduce(function (totalMatch, prop) {
        return totalMatch && matchAny(pat[prop], obj[prop]);
    }, true);
}

function matchAny(v1, v2) {

    if (v1 != null && v1.constructor === Object && v2 != null && v2.constructor === Object) {
        return matchObject(v1, v2);
    } else if (v1 !== v2) {
        return false;
    }
    return true;
}