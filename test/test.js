const assert = require('assert');
const match = require('../lib/index.js');

let weatherReports = [
    {
        city: 'London',
        weather: {
            code: '123',
            name: 'Rainy'
        }
    },
    {
        city: 'Paris',
        weather: {
            code: '234',
            name: 'Sunny'
        }
    }
];

describe('Map', function () {
    describe('#match()', function () {
        it('Deep object matching should match on Rainy ', function () {

            const weatherMessage = 'Bring an umbrella to ';

            let weatherMessages = weatherReports.map(match(
                { weather: { name: 'Rainy' } }, ({ city }) => weatherMessage + city
            ));

            assert.equal(weatherMessages[0], weatherMessage + weatherReports[0].city);
        });
    });
});

describe('Match number', function () {
    describe('#match()', function () {
        it('should return one', function () {

            let msg = match(
                0, _ => 'zero',
                1, _ => 'one',
                2, _ => 'two',
                _ => 'Thats a lot'
            )(1);

            assert.equal(msg, 'one');
        });
    });
});

describe('Match undefined', function () {
    describe('#match()', function () {
        it('undefined should go to catch all case', function () {

            let msg = match(
                0, _ => 'zero',
                1, _ => 'one',
                2, _ => 'two',
                _ => 'Thats a lot'
            )(undefined);

            assert.equal(msg, 'Thats a lot');
        });
    });
});

describe('Destructuring undefined', function () {
    describe('#match()', function () {
        it('destructured value of year should be 1985', function () {

            let car = {
                make: "suzuki",
                year: 1985
            };

            match(
                ({
                    year,
                    make
                }) => assert.equal(year, 1985)
            )(car);
        });
    });
});

describe('Destructuring undefined', function () {
    describe('#match()', function () {
        it('return of match should be "Nice toyota from 1985"', function () {

            let car = {
                make: "toyota",
                year: 1985
            };

            let msg = match(
                ({
                    year,
                    make
                }) => `Nice ${make} from ${year}`
            )(car);

            assert.equal(msg, 'Nice toyota from 1985');
        });
    });
});

describe('Deep object matching', function () {
    describe('#match()', function () {
        it('should match deep object', function () {
            let n = match({
                a: {
                    b: 'banana',
                    extra: 'extra'
                }
            }, () => 1,
                () => 2
            )({
                a: {
                    b: 'banana',
                    extra: 'extra'
                }
            });
            assert.equal(n, 1);
        });
    });
});

describe('Deep object matching', function () {
    describe('#match()', function () {
        it('should match deep object', function () {
            let n = match({
                a: {
                    b: 'banana'
                }
            }, () => 1,
                () => 2
            )({
                a: {
                    b: 'banana',
                    extra: 'extra'
                }
            });
            assert.equal(n, 1);
        });
    });
});

describe('Deep object matching', function () {
    describe('#match()', function () {
        it('should not match null', function () {
            let n = match({
                a: {
                    b: 'banana',
                }
            }, () => 1,
                () => 2
            )(null);
            assert.equal(n, 2);
        });
    });
});

describe('Deep object matching', function () {
    describe('#match()', function () {
        it('should not match null pattern', function () {
            let n = match({
                anything: null
            }, () => 1,
                () => 2
            )({
                anything: {
                    something: true
                }
            });
            assert.equal(n, 2);
        });
    });
});