var assert = require('assert');
const match = require('../index.js');

describe('Match number', function() {
    describe('#match()', function() {
        it('should return one', function() {
                
            var msg = match(1)(
                0, _ => 'zero',
                1, _ => 'one',
                2, _ => 'two',
                _ => 'Thats a lot'
            );

            assert.equal(msg, 'one');
        });
    });
});

describe('Match undefined', function() {
    describe('#match()', function() {
        it('undefined should go to catch all case', function() {
                
            var msg = match(undefined)(
                0, _ => 'zero',
                1, _ => 'one',
                2, _ => 'two',
                _ => 'Thats a lot'
            );

            assert.equal(msg, 'Thats a lot');
        });
    });
});

describe('Destructuring undefined', function() {
    describe('#match()', function() {
        it('destructured value of year should be 1985', function() {
                
            var car = {make: "suzuki", year: 1985};

            match(car)(
                ({year, make}) => assert.equal(year, 1985)
            );
        });
    });
});

describe('Destructuring undefined', function() {
    describe('#match()', function() {
        it('return of match should be "Nice toyota from 1985"', function() {
                
            var car = {make: "toyota", year: 1985};

            var msg = match(car)(
                ({year, make}) => `Nice ${make} from ${year}`
            );

            assert.equal(msg, 'Nice toyota from 1985');
        });
    });
});