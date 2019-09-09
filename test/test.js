const assert = require('assert');
const { match, gt, lt, op } = require('../lib/index.js');

const promise = async (d) => d;

function testPatternWithData({ pattern, data }) {
  return promise(data)
    .then(pattern)
    .then(assert.ok);
}

describe('#match()', function () {

  describe('Match types', function () {

    it('matches number', function () {
      const data = 1;
      const pattern = match(
        data, () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

    it('doesnt match number, but catches any', function () {
      const data = 2;
      const pattern = match(
        1, () => false,
        _ => true
      );

      return testPatternWithData({ pattern, data });
    });

    it('matches string', function () {
      const data = 'test_string';
      const pattern = match(
        data, () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

    it('matches bool', function () {
      const data = true;
      const pattern = match(
        data, () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

    it('matches object', function () {
      const data = { test: 'object' };
      const pattern = match(
        data, () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

    it('matches deep object', function () {
      const data = { test: { deep: 'object' } };
      const pattern = match(
        data, () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

    it('matches deep object pattern in multi-object pattern', function () {
      const data = { test: { deep: 'object' } };
      const pattern = match(
        { other: 'object' }, () => false,
        { notCorrect: 'object' }, () => false,
        data, () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

  });

  describe('Edge cases', function () {

    it('matches object with more props than pattern', function () {
      const data = { test: { deep: 'object' }, banana: 12 };
      const pattern = match(
        { other: 'object' }, () => false,
        { notCorrect: 'object' }, () => false,
        { banana: 12 }, () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

    it('doesnt match object with less props than pattern', function () {
      const data = { test: { deep: 'object' } };
      const pattern = match(
        { other: 'object' }, () => false,
        { notCorrect: 'object' }, () => false,
        { test: { deep: 'object' }, banana: 12 }, () => false,
        _ => true
      );

      return testPatternWithData({ pattern, data });
    });

    it('doesnt match with null or undefined', function () {
      const data = { test: { deep: 'object' } };
      const pattern = match(
        { other: 'object' }, () => false,
        { notCorrect: 'object' }, () => false,
        { test: { deep: undefined } }, () => false,
        { test: { deep: null } }, () => false,
        _ => true
      );

      return testPatternWithData({ pattern, data });
    });

    it('null doesnt get matched with actual values', function () {
      const data = { test: { deep: null } };
      const pattern = match(
        { other: 'object' }, () => false,
        { notCorrect: 'object' }, () => false,
        { test: { deep: 'object' } }, () => false,
        _ => true
      );

      return testPatternWithData({ pattern, data });
    });

    it('undefined doesnt get matched with actual values', function () {
      const data = { test: { deep: undefined } };
      const pattern = match(
        { other: 'object' }, () => false,
        { notCorrect: 'object' }, () => false,
        { test: { deep: 'object' } }, () => false,
        _ => true
      );

      return testPatternWithData({ pattern, data });
    });
  });

  describe('Matchlets', function () {

    it('greater-than matchlet matches higher number', function () {
      const data = 1;
      const pattern = match(
        gt(data - 1), () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

    it('should match third gt matchlet', function () {

      const data = 9;
      const pattern = match(
        gt(20), () => false,
        gt(10), () => false,
        gt(0), () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

    it('less-than matchlet matches lower number', function () {
      const data = 1;
      const pattern = match(
        lt(data + 1), () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

    it('optional matchlet matches values in array', function () {
      const data = 1;
      const pattern = match(
        op([data]), () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

    it('object-wrapped greater-than matchlet matches higher number', function () {
      const data = { num: 1 };
      const pattern = match(
        { num: gt(data.num - 1) }, () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

    it('object-wrapped less-than matchlet matches lower number', function () {
      const data = { num: 1 };
      const pattern = match(
        { num: lt(data.num + 1) }, () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

    it('object-wrapped optional matchlet matches values in array', function () {
      const data = { num: 1 };
      const pattern = match(
        { num: op([data.num]) }, () => true,
        _ => false
      );

      return testPatternWithData({ pattern, data });
    });

    it('doesnt match matchlet in mismatching pattern', function () {
      const data = { num: 1 };
      const pattern = match(
        { d: op([data.num]) }, () => false,
        _ => true
      );

      return testPatternWithData({ pattern, data });
    });
  });

  describe('Custom matchlets', function () {

    it('even number matchlet matches even number', function () {
      const even = n => n % 2 == 0;
      const data = 2;
      const pattern = match(
        even, () => true,
        _ => false
      );
      return testPatternWithData({ pattern, data });
    });

    it('even number matchlet doesnt match odd number', function () {
      const even = n => n % 2 == 0;
      const data = 1;
      const pattern = match(
        even, () => false,
        _ => true
      );
      return testPatternWithData({ pattern, data });
    });
  });

  describe('Promise prototype function', function () {

    it('Promise prototype function', function () {

      const even = n => n % 2 == 0;
      const data = 2;

      return promise(data)
        .match(
          even, () => true,
          _ => false
        )
        .then(assert.ok);
    });
  });


  describe('Test examples from readme', function () {

    it('Promise example', function () {

      let car = async () => ({ make: 'Toyota', year: 1968 });

      car()
        .match(
          { make: 'Subaru'}, () => 'Subaru',
          
          { year: lt(1950) }, car => `Super old ${car.make}`,

          { make: 'Toyota' }, ({ year }) => `Toyota from ${year}`,

          _ => 'something else'
        )
        .then((msg) => assert.equal('Toyota from 1968', msg));
    });

    it('Filter example', function () {

      let cars = [{ emissions: 2500 }, { emissions: 60000 }];

      let greenCars = cars.filter(
        match(
          { emissions: lt(3000) }, () => true,
          _ => false
        )
      );
      assert.deepEqual([{ emissions: 2500 }], greenCars);
    });

    it('Promise example 2', function () {

      let promise = async () => "hello";

      promise()
        .match(
          "hello", () => "Hello, world!",
          _ => "Goodbye"
        )
        .then((msg) => assert.equal('Hello, world!', msg));
    });

    it('Standalone example', function () {
      let ball = { mass: 5, volume: 10 };

      let throwBall = assert.ok;
      let density = assert.fail;

      match(
        { mass: 5 }, throwBall,

        { volume: gt(20) }, ({ mass, volume }) => density(mass, volume)
        
      )(ball) // Call match without promise
    });
  });

});