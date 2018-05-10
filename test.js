
const ø = require('./index.js')


let Ø = ø;
let µ = ø;
let ˆ = ø;
let æ = ø;
let Æ = ø;
let σ = ø;
let match = ø;


class Car {
    constructor(make, year) {
        this.make = make;
        this.year = year;
    }

}


let car = new Car('suzuki', 1977);

var s = match(car)(
    ({year, make}) => `Nice ${make} from ${year}`,
)
console.log(s);



// Best working one, cleanest solution, no dirty hacks
ø(car)(
    {make: 'suzuki'},  ({year}) => console.log(year),
    c => 1
)


ø(car)(
    {make: 'toyota'},  () => console.log("hi toyota"),
    c => c+1
)



let n = Math.floor(Math.random() * 10)

let msg = match(n)(
    0, _ => 'zero',
    1, _ => 'one',
    2, _ => 'two',
    3, _ => 'three',
    _ => 'Thats a lot'
)

console.log(msg);



let num = 5;

let m = ø(typeof num,
    'number', () => 5,
    c => c+1
)


// Simple json example perhaps

// fetch(myRequest)
//     .then(function(response) { return response.json(); })
//     .then(function(data) {

//         ø(data,
//             {name: 'cactus'}, (size) => {}
//         );

//     });
