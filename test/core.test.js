const { expect } = require('chai');
const { getVersion, reVersion, rangeVersion, versionParser } = require('../src/core');

describe('getVersion', () => {
    it('1.2.3的版本验证', () => {
        const res = getVersion('1.2.3');
        expect(res.small).to.equal('3');
        expect(res.middle).to.equal('2');
        expect(res.large).to.equal('1');
    });
    it('100.9976.100000的版本验证', () => {
        const res = getVersion('100.9976.100000');
        expect(res.small).to.equal('100000');
        expect(res.middle).to.equal('9976');
        expect(res.large).to.equal('100');
    });
});

describe('reVersion', () => {
    it('重置8', () => {
        expect(reVersion('8')).to.equal('8.0.0');
    });
    it('重置9.2', () => {
        expect(reVersion('9.2')).to.equal('9.2.0');
    });
    it('重置100.7.6', () => {
        expect(reVersion('100.7.6')).equal('100.7.6');
    });
});

describe('rangeVersion', () => {
    it('比较1.2.3和2.2.3', () => {
        expect(rangeVersion('1.2.3', '2.2.3')).to.equal(false);
    });
    it('比较2.2.3和1.2.3', () => {
        expect(rangeVersion('2.2.3', '1.2.3')).to.equal(true);
    });
    it('比较99.9.8000和99.10000.2', () => {
        expect(rangeVersion('99.9.8000', '99.10000.2')).to.equal(false);
    });
    it('比较9和8', () => {
        expect(rangeVersion('9', '8')).to.equal(true);
    });
    it('比较9.9和9.8', () => {
        expect(rangeVersion('9.9', '9.8')).to.equal(true);
    });
    it('比较9和9', () => {
        expect(rangeVersion('9', '9')).to.equal(true);
    });
});
