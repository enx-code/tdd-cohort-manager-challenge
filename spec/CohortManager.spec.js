const Cohortmanager = require('../src/CohortManager.js')

describe('Cohortmanager', () => {
  let cohortManager

  beforeEach(() => {
    cohortManager = new Cohortmanager()
  })

  it('created and without any input', () => {
   
    const expected = {
      studentList: [],
      cohortList: []
    }

    expect(cohortManager.studentList).toEqual([])
    expect(cohortManager.cohortList).toEqual([])
  })

  it('create 2 valid cohorts', () => {
    cohortManager.createCohort('abc')
    cohortManager.createCohort('0123')

    expect(cohortManager.cohortList[0].cohortName).toBe('abc')
    expect(cohortManager.cohortList[1].cohortName).toBe('0123')
  })

  it('create 2 invalid cohorts name', () => {

    expect(() => cohortManager.createCohort(null)).toThrow()
    expect(() => cohortManager.createCohort(123)).toThrow()
  })

  it('create a cohort with an already used name', () => {
    cohortManager.createCohort('abc')
    expect(() => cohortManager.createCohort('abc')).toThrow()
  })

  it('create 2 students', () => {
    cohortManager.createStudent('Bob', 'Belcher', 'http', 'bob@burger.com')
    cohortManager.createStudent('Tom', 'Telmer', 'http', 'tom@soda.com')
    expect(cohortManager.studentList.length).toBe(2)
    expect(cohortManager.studentList[0].name).toBe('Bob')
    expect(cohortManager.studentList[1].name).toBe('Tom')
  })

  it('create 2 invalid students', () => {
    expect(() =>
      cohortManager.createStudent(123, 'Belcher', 'http', 'bob@burger.com')
    ).toThrow()
    expect(() =>
      cohortManager.createStudent('Tom', 321, 'http', 'tom@soda.com')
    ).toThrow()
    expect(cohortManager.studentList.length).toBe(0)
  })

  it('search for a cohort by name', () => {
    cohortManager.createCohort('gold')
    const result = cohortManager.searchCohort('gold')

    expect(result.cohortName).toBe('gold')
  })

  it('search for a cohort by name', () => {
    cohortManager.createCohort('golden')
    cohortManager.createCohort('golde')
    const result = cohortManager.searchCohort('golden')

    expect(result.cohortName).toBe('golden')
  })

  it('search for invalid cohort name', () => {
    expect(() => cohortManager.searchCohort(null)).toThrow()
    expect(() => cohortManager.searchCohort(123)).toThrow()
  })

  it('search for a student by name', () => {
    cohortManager.createStudent('Bob', 'Belcher', 'http', 'bob@burger.com')
    const result = cohortManager.searchStudentName('Bob')

    expect(result[0].name).toBe('Bob')
  })
})