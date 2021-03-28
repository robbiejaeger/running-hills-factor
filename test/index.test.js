import calculateHillsFactor, { calcPercentGrade } from '../index.js';

describe('Percent grade calculator', () => {
  it('gives a positive grade', () => {
    let grade = calcPercentGrade(10, 10)

    expect(grade).toEqual(100);
  });
})

describe('End-to-end tests', () => {
  it('returns zero gain or loss', async () => {
    let timeDiff = await calculateHillsFactor('./test/sample-no-gain-or-loss.gpx');

    expect(timeDiff).toEqual(Number(0).toFixed(1));
  });
});