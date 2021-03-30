import HillsFactor  from '../index.js';
import { calcPercentGrade } from '../src/util';

describe('Percent grade calculator', () => {
  it('gives a positive grade', () => {
    let grade = calcPercentGrade(10, 10)

    expect(grade).toEqual(100);
  });
})

describe('End-to-end tests', () => {
  it('returns zero gain or loss', async () => {
    const newHillsFactor = new HillsFactor();
    let timeDiff = await newHillsFactor.calculateHillsFactor('./test/sample-no-gain-or-loss.gpx');

    expect(timeDiff).toEqual("0.0");
  });

  it('returns zero for equal gain and loss', async () => {
    const newHillsFactor = new HillsFactor();
    let timeDiff = await newHillsFactor.calculateHillsFactor('./test/sample-net-no-gain-or-loss.gpx');

    expect(timeDiff).toEqual("-0.0");
  });
});
