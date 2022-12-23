const Cohortmanager = require('../src/CohortManager.js')
// const Cohort = require('../src/Cohort.js')

describe('Cohort', () => {
  let cohortManager
  let test

  beforeEach(() => {
    cohortManager = new Cohortmanager()
    test = cohortManager.createCohort('test')
  })

  it('created without any input', () => {
    const expected = {
      cohortName: 'test',
      studentInside: [],
      capacity: 24
    }

    expect(test.cohortName).toBe('test')
    expect(cohortManager.cohortList.length).toBe(1)
  })

  it('add student inside the cohort', () => {
    let bob = cohortManager.createStudent(
      'Bob',
      'Belcher',
      'http',
      'bob@burger.com'
    )
    test.addStudent(bob)

    expect(test.studentInside.length).toBe(1)
    expect(test.studentInside[0].name).toBe('Bob')
    expect(cohortManager.cohortList[0].studentInside.length).toBe(1)
  })

  it('remove student from the cohort', () => {
    let bob = cohortManager.createStudent(
      'Bob',
      'Belcher',
      'http',
      'bob@burger.com'
    )
    test.addStudent(bob)
    test.removeStudent(bob)

    expect(test.studentInside.length).toBe(0)
    expect(cohortManager.cohortList[0].studentInside.length).toBe(0)
  })

  it('search student from the cohort', () => {
    let bob = cohortManager.createStudent(
      'Bob',
      'Belcher',
      'http',
      'bob@burger.com'
    )
    test.addStudent(bob)
    const result = test.searchStudent(bob)[0]

    expect(result).toBe(bob)
  })

  it('search student not inside cohort', () => {
    let rob = cohortManager.createStudent(
      'Rob',
      'Belcher',
      'http',
      'bob@burger.com'
    )

    expect(() => test.searchStudent(rob)).toThrow()
  })
})
