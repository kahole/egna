# egna
[![npm version](https://badge.fury.io/js/egna.svg)](https://www.npmjs.com/package/egna)

## Pattern matching in JS

```javascript
import { match } from 'egna';
```
[[ Try egna in your browser ]](https://npm.runkit.com/egna)

**Example**
```javascript
import { match, lt } from 'egna';

let car = async () => ({ make: 'Toyota', year: 1968 });

car()
  .match(
    { make: 'Subaru'}, 'Subaru',
  
    { year: lt(1950) }, car => `Super old ${car.make}`,

    { make: 'Toyota' }, ({ year }) => `Toyota from ${year}`,

    _ => {throw 'I dont recognize this car'}
  )
  .then(console.log)
  .catch( (e) => console.log("error: " + e) );
  
// prints "Toyota from 1968"
```

**Match anything**
```javascript
match(
  'literal pattern', handlerFunc,

  [1, 2, 3], myArrayHandlerFunc,

  { my: { object: 'pattern' } }, 'Handlers can be just data also',

  _ => 'Single expression/literal at the end is the any handler'
);
```

## Scenarios

### Filter/map/reduce/etc
```javascript
import { match, gt } from 'egna';

let cars = [{ emissions: 2500 }, { emissions: 60000 }];

let greenCars = cars.filter(
  match(
    { emissions: lt(3000) }, true,
    _ => false
  )
);

// greenCars = [{ emissions: 2500 }]
```

### Promises
The `egna` module adds a match function to `Promise.prototype.match`.
Meaning you can call match on any Promise generated from the global `Promise` prototype.

```javascript
import 'egna'; // only have to import once anywhere in the project

let promise = async () => "hello";

promise()
  .match(
    "hello", "Hello, world!",
    _ => "Goodbye"
  )
  .then(console.log);
// return value of the matched handler is passed along the promise chain
```

### Pattern reuse
A call to match returns function loaded with the patterns and handlers. This function can be stored and used whenever.
```javascript
import { match, gt } from 'egna';

let httpPattern =
  match(
    { status: 404 }, 'Not found',
    { status: 200 }, 'Ok',
    { status: gt(499) }, 'Server error,
    'Unknown'
  );

const msg = httpPattern(httpObject);
const msg2 = httpPattern(httpObject2);
// Use it multiple times
```

## Matchlet functions
**A function anywhere in a pattern will be evaluated in place of the usual comparison, returning true/false.**

Matchlet-generators included in egna:

| Name       | Matches                                                 |
|------------|---------------------------------------------------------|
| `gt`       | Greater than `arg`                                      |
| `lt`       | Less than `arg`                                         |
| `op`       | Optional, value exists in the argument array.           |

**Use egna's matchlets**
```javascript
import { match, gt, lt, op } from 'egna';

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

<!-- **Map with deep object matching** -->
<!-- ```javascript -->
<!-- let weather = [ -->
<!--   { city: 'London', weather: { code: '123', name: 'Cloudy' } }, -->
<!--   { city: 'Bergen', weather: { code: '234', name: 'Rainy' } } -->
<!-- ]; -->

<!-- weather.map(match( -->
<!--   { weather: { name: 'Rainy' } }, ({ city }) => 'Bring an umbrella to ' + city, -->
<!--   { weather: { name: 'Sunny' } }, ({ city }) => 'Bring sunglasses to ' + city, -->
<!--   ({ city }) => 'Nothing to bring in ' + city -->
<!-- )); -->

<!-- // returns [ 'Nothing to bring in London', 'Bring an umbrella to Bergen' ] -->
<!-- ``` -->

**[tc39 proposal](https://github.com/tc39/proposal-pattern-matching) example:**
```javascript
fetch(jsonService)
  .match(
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
```
