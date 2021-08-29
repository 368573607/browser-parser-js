const { expect } = require('chai');
const {
    reVersion, rangeVersion, compareUa, browserParser,
} = require('../src/core');

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
    it('比较1.2.99.28和2.2.3', () => {
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

describe('compareUa', () => {
    it('8违规', () => {
        expect(compareUa('8')).to.equal(true);
    });
    it('9违规', () => {
        expect(compareUa('9')).to.equal(true);
    });
    it('10合法', () => {
        expect(compareUa('10')).to.equal(false);
    });
    it('9.0.1合法', () => {
        expect(compareUa('9.0.1')).to.equal(false);
    });
});

describe('browserParser', () => {
    it('8合法', () => {
        expect(browserParser([{ name: 'Chrome', version: '50.3.4' }, { name: 'IE', version: '8' }])).to.equal(false);
    });
    it('9合法', () => {
        expect(browserParser([{ name: 'IE', version: '9' }])).to.equal(false);
    });
    it('10违规', () => {
        expect(browserParser([{ name: 'IE', version: '10' }])).to.equal(true);
    });
    it('9.0.1违规', () => {
        expect(browserParser([{ name: 'IE', version: '9.0.1' }])).to.equal(true);
    });
    it('9.0.1.5违规', () => {
        expect(browserParser([{ name: 'IE', version: '9.0.1.5' }])).to.equal(true);
    });
    it('8.999.999合法', () => {
        expect(browserParser([{ name: 'IE', version: '8.999.999' }])).to.equal(true);
    });
    it('8.999.999.999合法', () => {
        expect(browserParser([{ name: 'IE', version: '8.999.999.999' }])).to.equal(true);
    });
});
