var { match, lt } = require("egna")

/*Try changing the year to something earlier than 1950*/

let car = async () => ({ make: 'Toyota', year: 1968 });

car().then(
  match(
    { year: lt(1950), make: 'Toyota' }, () => 'Super old toyota',

    { make: 'Toyota' }, () => 'Toyota',

    _ => 'something else'
  )
)
.then(console.log)