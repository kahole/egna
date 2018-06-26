var assert = require('assert');
const match = require('../index.js');

const not_logged_in = 'Not logged in';

function fetch(url) {
    return Promise.resolve({json: () => { return {status: 'error', message: not_logged_in};}});
}

describe('Match mock API call', function() {
    describe('#match()', function() {
        it('should match on error and throw', function(done) {

	    fetch("/api/users")
	    .then(res => res.json())
	    .then(match(
			{status: 'error'}, (error) => { throw Error(error.message)},
			(users) => { done(Error("Didnt match on error object")) }
	    ))
	    .catch(err => {done()});
        });
    });
});

describe('Match number', function() {
    describe('#match()', function() {
        it('should return one', function() {
                
            var msg = match(
                0, _ => 'zero',
                1, _ => 'one',
                2, _ => 'two',
                _ => 'Thats a lot'
            )(1);

            assert.equal(msg, 'one');
        });
    });
});

describe('Match undefined', function() {
    describe('#match()', function() {
        it('undefined should go to catch all case', function() {
                
            var msg = match(
                0, _ => 'zero',
                1, _ => 'one',
                2, _ => 'two',
                _ => 'Thats a lot'
            )(undefined);

            assert.equal(msg, 'Thats a lot');
        });
    });
});

describe('Destructuring undefined', function() {
    describe('#match()', function() {
        it('destructured value of year should be 1985', function() {
                
            var car = {make: "suzuki", year: 1985};

            match(
                ({year, make}) => assert.equal(year, 1985)
            )(car);
        });
    });
});

describe('Destructuring undefined', function() {
    describe('#match()', function() {
        it('return of match should be "Nice toyota from 1985"', function() {
                
            var car = {make: "toyota", year: 1985};

            var msg = match(
                ({year, make}) => `Nice ${make} from ${year}`
            )(car);

            assert.equal(msg, 'Nice toyota from 1985');
        });
    });
});
