import RunningHillsFactor from '../index.js';

describe('End-to-end tests', () => {
  it('returns zero gain or loss', async () => {
    const runningHillsFactor = new RunningHillsFactor();
    let timeDiff = await runningHillsFactor.calculateHillsFactor('./test/sample-no-gain-or-loss.gpx');

    expect(timeDiff).toEqual("0.0");
  });

  it('returns zero for equal gain and loss for default incline/decline', async () => {
    const runningHillsFactor = new RunningHillsFactor();
    let timeDiff = await runningHillsFactor.calculateHillsFactor('./test/sample-net-no-gain-or-loss.gpx');

    expect(timeDiff).toEqual("0.0");
  });

  it('returns time gained for default decline factor', async () => {
    const runningHillsFactor = new RunningHillsFactor();
    let timeDiff = await runningHillsFactor.calculateHillsFactor('./test/sample-decline.gpx');

    expect(timeDiff).toEqual("8.0");
  });

  it('returns time lost for default incline factor', async () => {
    const runningHillsFactor = new RunningHillsFactor();
    let timeDiff = await runningHillsFactor.calculateHillsFactor('./test/sample-incline.gpx');

    expect(timeDiff).toEqual("-15.0");
  });

  it('returns time gained for custom decline factor', async () => {
    const runningHillsFactor = new RunningHillsFactor({declineFactor: 7});
    let timeDiff = await runningHillsFactor.calculateHillsFactor('./test/sample-decline.gpx');

    expect(timeDiff).toEqual("7.0");
  });

  it('returns time lost for custom incline factor', async () => {
    const runningHillsFactor = new RunningHillsFactor({inclineFactor: 12});
    let timeDiff = await runningHillsFactor.calculateHillsFactor('./test/sample-incline.gpx');

    expect(timeDiff).toEqual("-12.0");
  });
});
