# egna
[![npm version](https://badge.fury.io/js/egna.svg)](https://www.npmjs.com/package/egna)
## Basic pattern matching for JS

```javascript
const match = require('egna')
```

**Numbers**
```javascript
let n = Math.floor(Math.random() * 6)

match(
    0, () => 'zero',
    1, () => 'one',
    2, () => 'two',
    _ => 'Thats a lot'
)(n)
```

**Match object and destructure**
```javascript
let car = {make: "toyota", year: 1985}

match(
    {make: 'suzuki'}, ({year}) => `Nice suzuki from ${year}`,

    {year: 1985}, ({make}) => `That is an old ${make}`,

    () => "catch all"
)(car)

// That is an old toyota
```

**Map with deep object matching**
```javascript
let weather = [
    { city: 'London', weather: { code: '123', name: 'Cloudy' } },
    { city: 'Bergen', weather: { code: '234', name: 'Rainy' } }
];

weather.map(match(
    { weather: { name: 'Rainy' } }, ({ city }) => 'Bring an umbrella to ' + city,
    { weather: { name: 'Sunny' } }, ({ city }) => 'Bring some sunglasses to ' + city,
    ({ city }) => 'Nothing to bring in ' + city
));

// Outputs:
// [ 'Nothing to bring in London', 'Bring an umbrella to Bergen' ]
```

**Only destructuring**
```javascript
let car = {make: "suzuki", year: 1985}

let msg = match(
    ({year, make}) => `Nice ${make} from ${year}`
)(car)

console.log(msg) // Nice suzuki from 1985
```

**Notes**
```javascript
match(
    match_val, (val) => {}, /* Function for the case directly preceding it */

    (val) => "catch all", /* A lonely function is a catch-all case*/

    /* val is passed to all the functions no matter what*/
    ({property}) => "destructure an object" 
)(val) // Match anything, returns whatever the matched function returns
```
