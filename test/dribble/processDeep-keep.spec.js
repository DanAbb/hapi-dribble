'use strict';

const Code = require('code');
const Lab = require('lab');

const filter = require('../../lib/dribble');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;

describe('processDeep Keep', () => {

  it('should keep only properties specified', (done) => {
    const res = filter.processDeep({ for: 'a.b', keep: ['c', 'd'] }, {
      a: {
        b: {
          c: 'c',
          d: 'd',
          e: 'e'
        },
        f: 'f'
      },
      g: 'g'
    });

    expect(res).to.equal({
      a: {
        b: {
          c: 'c',
          d: 'd'
        },
        f: 'f'
      },
      g: 'g'
    });
    done();
  });

  it('should keep only properties specified within a parent array', (done) => {
    const res = filter.processDeep({ for: 'a.b', keep: ['c', 'd'] }, {
      a: [{
        b: {
          c: 'c',
          d: 'd',
          e: 'e'
        },
        f: 'f'
      }, {
        b: {
          c: 'c',
          d: 'd',
          e: 'e'
        },
        f: 'f'
      }],
      g: 'g'
    });

    expect(res).to.equal({
      a: [{
        b: {
          c: 'c',
          d: 'd'
        },
        f: 'f'
      }, {
        b: {
          c: 'c',
          d: 'd'
        },
        f: 'f'
      }],
      g: 'g'
    });
    done();
  });

  it('should keep only properties specified within a parent jaggered array', (done) => {
    const res = filter.processDeep({ for: 'a.[].b', keep: ['c', 'd'] }, {
      a: [
        [
          {
            b: {
              c: 'c',
              d: 'd',
              e: 'e'
            },
            f: 'f'
          }
        ]
      ],
      g: 'g'
    });

    expect(res).to.equal({
      a: [
        [
          {
            b: {
              c: 'c',
              d: 'd'
            },
            f: 'f'
          }
        ]
      ],
      g: 'g'
    });
    done();
  });

  it('should keep only properties specified within a parent nested jaggered array', (done) => {
    const res = filter.processDeep({ for: 'a.[].[].b', keep: ['c', 'd'] }, {
      a: [
        [
          [
            {
              b: {
                c: 'c',
                d: 'd',
                e: 'e'
              },
              f: 'f'
            }
          ]
        ]
      ],
      g: 'g'
    });

    expect(res).to.equal({
      a: [
        [
          [
            {
              b: {
                c: 'c',
                d: 'd'
              },
              f: 'f'
            }
          ]
        ]
      ],
      g: 'g'
    });
    done();
  });

});
