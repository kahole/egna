# egna
[![npm version](https://badge.fury.io/js/egna.svg)](https://www.npmjs.com/package/egna)
## Basic pattern matching for JS

```javascript
const match = require('egna')
```

**Fetch; motivational example**
```javascript
fetch("/api/users")
    .then(res => res.json())
    .then(match(
		{status: 'error'}, (error) => { throw Error(error.message) },
		(users) => users // here users is just passed on in the Promise chain
    ))
    .catch(handleError);
	
// Mock data used in example:
// Error       {status: 'error', errorMessage: 'Not logged in'}
// Successful  {users: [...]}
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

**Only destructuring**
```javascript
let car = {make: "suzuki", year: 1985}

let msg = match(
    ({year, make}) => `Nice ${make} from ${year}`
)(car)

console.log(msg) // Nice suzuki from 1985
```

**Breakdown**
```javascript
match(
    match_val, (val) => {}, /* Function for the case directly preceding it */

    (val) => "catch all", /* A lonely function is a catch-all case*/

    /* val is passed to all the functions no matter what*/
    ({property}) => "destructure an object" 
)(val) // Match anything, returns whatever the matched function returns
```
