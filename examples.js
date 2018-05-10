const match = require('./index.js')

var msg;

let n = Math.floor(Math.random() * 6)

msg = match(n)(
    0, _ => 'zero',
    1, _ => 'one',
    2, _ => 'two',
    _ => 'Thats a lot'
)

console.log(msg)


var car = {make: "toyota", year: 1985}

msg = match(car)(
    {make: 'suzuki'}, ({year}) => `Nice suzuki from ${year}`,

    {year: 1985}, ({make}) => `That is an old ${make}`,

    () => "catch all"
)

console.log(msg)



car = {make: "suzuki", year: 1985}

msg = match(car)(
    ({year, make}) => `Nice ${make} from ${year}`
)

console.log(msg)
