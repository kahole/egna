# egna
[![npm version](https://badge.fury.io/js/egna.svg)](https://www.npmjs.com/package/egna)
## Basic pattern matching for JS

```javascript
const match = require('egna')
```

**Numbers**
```javascript
let n = Math.floor(Math.random() * 6)

match(n)(
    0, _ => 'zero',
    1, _ => 'one',
    2, _ => 'two',
    _ => 'Thats a lot'
)
```

**Objects w/ destructuring** (works with classes as well)
```javascript
let car = {make: "toyota", year: 1985}

match(car)(
    {make: 'suzuki'}, ({year}) => `Nice suzuki from ${year}`,

    {year: 1985}, ({make}) => `That is an old ${make}`,

    () => "catch all"
)

// That is an old toyota
```

**Destructuring**
```javascript
let car = {make: "suzuki", year: 1985}

let msg = match(car)(
    ({year, make}) => `Nice ${make} from ${year}`
)

console.log(msg) // Nice suzuki from 1985
```

**Breakdown**
```javascript
match(val)( // Match anything, returns whatever the matched function returns

    match_val, (val) => {} /* Function for the case directly preceding it */,

    (val) => "catch all", /* A lonely function is a catch-all case*/

    /* val is passed to all the functions no matter what*/
    ({property}) => "destructure an object" 
)
```
