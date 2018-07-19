# egna
[![npm version](https://badge.fury.io/js/egna.svg)](https://www.npmjs.com/package/egna)
## Simple pattern matching for JS

```javascript
const match = require('egna')
```

**In promises**
```javascript
fetch('/taco')
    .then(res => res.json())
    .then(match(
        { sauce: 'mild' }, () => 'No thanks',
        { sauce: 'extra hot' }, () => 'Great!',
        () => 'OK'
    ))

// Passes on 'No thanks', 'Great!' or 'OK' in the chain
```

**Match object and destructure**
```javascript
let car = {make: 'toyota', year: 1985}

match(
    {make: 'suzuki'}, ({ year }) => `Nice suzuki from ${year}`,

    {year: 1985}, ({ make }) => `That is an old ${make}`,

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

**Works with any data type**
```javascript
let n = Math.floor(Math.random() * 6)

match(
    0, () => 'zero',
    1, () => 'one',
    2, () => 'two',
    _ => 'Thats a lot'
)(n)
```