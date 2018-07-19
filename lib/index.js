'use strict';

function matchObject(pat, obj) {

    return Object.keys(pat).reduce(function (totalMatch, prop) {

        var matches = true;
        if (pat[prop] != null && pat[prop].constructor === Object && obj[prop] != null && obj[prop].constructor === Object) {
            matches = matchObject(pat[prop], obj[prop]);
        } else if (pat[prop] !== obj[prop]) {
            matches = false;
        }

        return totalMatch && matches;
    }, true);
}

module.exports = function () {
    for (var _len = arguments.length, patterns = Array(_len), _key = 0; _key < _len; _key++) {
        patterns[_key] = arguments[_key];
    }

    return function (obj) {

        for (var i = 0; i < patterns.length; i++) {

            var pat = patterns[i];
            var matches = true;

            if (typeof pat !== 'function') {
                matches = matchObject({ v: pat }, { v: obj });
                i += 1;
            }

            var fun = patterns[i];

            if (matches) return fun.apply(null, [obj]);
        }
    };
};