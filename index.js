'use strict';

module.exports = function(obj) {

    return (...patterns) => {

        for (var i = 0; i < patterns.length; i++) {

            let pat = patterns[i];
            var matches = true;

            if (typeof pat === 'object') {
                Object.keys(pat).forEach( prop => {
                    if (pat[prop] !== obj[prop])
                        matches = false;
                });

                i += 1;
            } else if (typeof pat !== 'function') {
                matches = (pat === obj);
                i += 1;
            } 
                
            let fun = patterns[i];

            if (matches)
                return fun.apply(null, [obj]);
        }
    }
}