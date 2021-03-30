import { calcPercentGrade } from '../src/util';

describe('Percent grade calculator', () => {
  it('returns a positive grade', () => {
    let grade = calcPercentGrade(10, 10)

    expect(grade).toEqual(100);
  });

  it('returns a negative grade', () => {
    let grade = calcPercentGrade(-10, 10)

    expect(grade).toEqual(-100);
  });
})
