'use strict';

function matchObject(pat, obj) {

    return Object.keys(pat).reduce((totalMatch, prop) => {

        let matches = true;
        if ((pat[prop] != null && pat[prop].constructor === Object) &&
            (obj[prop] != null && obj[prop].constructor === Object)) {
            matches = matchObject(pat[prop], obj[prop]);
        } else if (pat[prop] !== obj[prop]) {
            matches = false;
        }

        return totalMatch && matches;
    }, true);
}

module.exports = function (...patterns) {

    return (obj) => {

        for (var i = 0; i < patterns.length; i++) {

            let pat = patterns[i];
            var matches = true;

            if (typeof pat !== 'function') {
                matches = matchObject({ v: pat }, { v: obj });
                i += 1;
            }

            let fun = patterns[i];

            if (matches)
                return fun.apply(null, [obj]);
        }
    }
}
