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

});