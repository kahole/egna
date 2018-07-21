var { match, lt } = require("egna")

let car = async () => ({make: 'Toyota', year: 1968});

car().then(
    match(
        {year: lt(1950), make: 'Toyota'}, () => 'Super old toyota',

        {make: 'Toyota'}, () => 'Toyota',

        _ => 'something else'
    )
)
.then(console.log)