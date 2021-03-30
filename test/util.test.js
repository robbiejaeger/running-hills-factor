import {
  calcPercentGrade,
  metersToMiles,
  calcTimeDiff,
  cleanRoutePoints
} from '../src/util';

describe('Percent grade calculator', () => {
  it('returns a positive grade', () => {
    let grade = calcPercentGrade(10, 10)

    expect(grade).toEqual(100);
  });

  it('returns a negative grade', () => {
    let grade = calcPercentGrade(-10, 10)

    expect(grade).toEqual(-100);
  });

  it('returns a zero grade', () => {
    let grade = calcPercentGrade(0, 10)

    expect(grade).toEqual(0);
  });
});

describe('Meters to miles conversion', () => {
  it('converts meters to miles', () => {
    let miles = metersToMiles(1609.34);
    let roundedMiles = Math.round(miles);

    expect(roundedMiles).toEqual(1);
  });
});

describe('Calculate time different for distance and percent grade', () => {
  it('returns a positive number for a decline', () => {
    let segmentTimeDiff = calcTimeDiff(-1, 1609.34, 10, 5);
    let roundedSegmentTimeDiff = Math.round(segmentTimeDiff);

    expect(roundedSegmentTimeDiff).toEqual(5);
  });

  it('returns a negative number for an incline', () => {
    let segmentTimeDiff = calcTimeDiff(1, 1609.34, 10, 5);
    let roundedSegmentTimeDiff = Math.round(segmentTimeDiff);

    expect(roundedSegmentTimeDiff).toEqual(-10);
  });

  it('returns zero number for no incline or decline', () => {
    let segmentTimeDiff = calcTimeDiff(0, 1609.34, 10, 5);

    expect(segmentTimeDiff).toEqual(0);
  });
});

describe('Changes format of route points', () => {
  it('converts route points from string to float', () => {
    let routePoints = [
      {
        lat: ["39.78016"],
        lon: ["-105.04978"],
        ele: ["1203.54"]
      }
    ];

    let convertedRoutePoints = cleanRoutePoints(routePoints);

    let expectedRoutePoints = [
      {
        lat: 39.78016,
        lon: -105.04978,
        ele: 1203.54
      }
    ];

    expect(convertedRoutePoints).toEqual(expectedRoutePoints);
  });
});
