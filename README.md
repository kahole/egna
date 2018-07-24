# egna
[![npm version](https://badge.fury.io/js/egna.svg)](https://www.npmjs.com/package/egna)

## Pattern matching in JS

```javascript
import { match } from 'egna'
```
[[ Try it out! ]](https://npm.runkit.com/egna)

**[tc39 proposal](https://github.com/tc39/proposal-pattern-matching) example:**
```javascript
fetch(jsonService).then(

  match(
    { status: 200 }, ({ headers: { 'Content-Length': s } }) => {
      console.log(`size is ${s}`)
    },
    { status: 404 }, () => {
      console.log('JSON not found')
    },
    { status: gt(399) }, () => {
      throw new RequestError(res)
    }
  )
)
```

**Example**
```javascript
fetch('/uptime/status').then(
  match(
    { status: 'normal' }, () => 'Operating normally',

    { status: 'warning' }, ({ msg }) => displayWarning(msg),

    { status: 'error', rate: gt(50) }, () => 'Error rate higher than 50%',

    _ => 'Some errors'
  )
)
.then( /* return value of the matched handler gets passed along */)
```

**Match anything**
```javascript
match(
  'literal pattern', handlerFunc,

  { my: { object: 'pattern' } }, anotherHandlerFunc,

  _ => 'Single function at the end is the catch-any handler'
)
```

## Matchlet functions
**A function anywhere in a pattern will be evaluated in place of the usual comparison, returning true/false.**

Matchlet-generators included in egna:

| Name       | Matches                                                 |
|------------|---------------------------------------------------------|
| `gt`       | Greater than `arg`                                      |
| `lt`       | Less than `arg`                                         |
| `op`       | Optional, value exists in the argument array.           |

<!-- ----
**Example using `lt`:**
```javascript
match(
    { car: { year: lt(1970) } }, () => 'Thats vintage!',

    { car: { year: gt(1999) } }, () => 'Thats a classic',

    _ => 'Too modern'
)
``` -->
**Use egna's matchlets**
```javascript
import { match, gt, lt, op } from 'egna'

match(
  gt(10), () => 'greater than 10',

  lt(5), () => 'less than 5',

  op([6, 7]), () => 'either 6 or 7',

  _ => 'something else'
)
```
**or make your own**

```javascript
const even = n => n % 2 == 0;

match(
  even, () => 'even number',
  _ => 'odd number'
)(34)

// returns 'even number'
```

## More examples

**Map with deep object matching**
```javascript
let weather = [
  { city: 'London', weather: { code: '123', name: 'Cloudy' } },
  { city: 'Bergen', weather: { code: '234', name: 'Rainy' } }
];

weather.map(match(
  { weather: { name: 'Rainy' } }, ({ city }) => 'Bring an umbrella to ' + city,
  { weather: { name: 'Sunny' } }, ({ city }) => 'Bring sunglasses to ' + city,
  ({ city }) => 'Nothing to bring in ' + city
));

// returns [ 'Nothing to bring in London', 'Bring an umbrella to Bergen' ]
```

<!-- ```javascript
match(
    // Match literals
    42, () => 'The meaning of life',

    // Match object patterns and destructure
    {name: 'Banana'}, ({ color }) => 'Bananas are ' + color,

    // Use egna's matchlets
    {car: { year: lt(1970) }}, () => 'Thats vintage!',
    
    // Use your own matchlets
    {car: { year: (y) => y < 1970 }}, () => 'Thats also vintage!',

)
``` -->