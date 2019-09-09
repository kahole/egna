var { match, lt } = require("egna")

/* Try changing the year to something earlier than 1950 */

let car = async () => ({ make: 'Toyota', year: 1968 });

car()
  .match(
    { make: 'Subaru'}, () => 'Subaru',
    
    { year: lt(1950) }, car => `Super old ${car.make}`,

    { make: 'Toyota' }, ({ year }) => `Toyota from ${year}`,

    _ => 'something else'
  )
  .then(console.log)