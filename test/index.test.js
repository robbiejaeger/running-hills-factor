import { calcPercentGrade } from '../index.js';

describe('Percent grade calculator', () => {
  it('gives a positive grade', () => {
    let grade = calcPercentGrade(10, 10)

    expect(grade).toEqual(100);
  });
})
