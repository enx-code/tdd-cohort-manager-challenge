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
  
  it('search for a student by Id', () => {
    // set up
    cohortManager.createStudent('Bob', 'Belcher', 'http', 'bob@burger.com')
    const result = cohortManager.searchStudentId(1)
    expect(result.id).toBe(1)
  })

  it('search for a student by Id or name', () => {
    // set up
    cohortManager.createStudent('Bob', 'Belcher', 'http', 'bob@burger.com')
    cohortManager.createStudent('Tom', 'Telmer', 'http', 'tom@soda.com')
    cohortManager.createStudent('Tom', 'Marino', 'http', 'tom@sale.com')
    const result1 = cohortManager.searchStudent(1)
    const result2 = cohortManager.searchStudent('Tom')
    const result3 = cohortManager.searchStudent('Bob')
    expect(result1.id).toBe(1)
    expect(result2[0].id).toBe(2)
    expect(result3.id).toBe(1)
  })

  it('delete a cohort', () => {
    // set up
    cohortManager.createCohort('gold')
    let result1 = cohortManager.deleteCohort('gold')
    expect(cohortManager.cohortList).toEqual([])
  })

  it('delete a cohort using an invalid name', () => {
    // set up
    cohortManager.createCohort('silver')
    expect(() => cohortManager.deleteCohort('go')).toThrow()
  })

  it('add a student to a Cohort with a method of the Manager', () => {
    // set up
    cohortManager.createCohort('silver')
    cohortManager.createStudent('Bob', 'Belcher', 'http', 'bob@burger.com')
    let result = cohortManager.addStudent('Bob', 'silver')
    expect(result).toBe(`Bob is now inside Cohort silver`)
  })

  it('add student inside the cohort', () => {
    // set up
    cohortManager.createCohort('silver')
    cohortManager.createStudent('Bob', 'Belcher', 'http', 'bob@burger.com')
    cohortManager.createStudent('Bob', 'sticher', 'http', 'bob@burger.com')
    expect(() => cohortManager.addStudent('Bob', 'silver')).toThrow()
  })

  it('add too many student inside the cohort', () => {
    // set up
    cohortManager.createCohort('silver')
    function createToMany() {
      for (let i = 0; i < 25; i++) {
        cohortManager.createStudent('Bob', 'Belcher', 'http', 'bob@burger.com')
        cohortManager.addStudent(i + 1, 'silver')
      }
    }

    expect(() => createToMany()).toThrow()
  })

  it('remove student not inside cohort', () => {
    // set up
    cohortManager.createCohort('silver')
    cohortManager.createStudent('Bob', 'Belcher', 'http', 'bob@burger.com')
    expect(() => cohortManager.removeStudent('Bob', 'silver')).toThrow()
  })

  it('remove student inside cohort', () => {
    // set up
    cohortManager.createCohort('silver')
    const bob = cohortManager.createStudent(
      'Bob',
      'Belcher',
      'http',
      'bob@burger.com'
    )
    cohortManager.addStudent('Bob', 'silver')
    const result = cohortManager.removeStudent('Bob', 'silver')
    expect(result).toEqual('Bob has been removed from Cohort silver')
  })

  it('remove student inside cohort', () => {
    // set up
    cohortManager.createCohort('silver')
    const bob = cohortManager.createStudent(
      'Bob',
      'Belcher',
      'http',
      'bob@burger.com'
    )
    cohortManager.addStudent('Bob', 'silver')
    const result = cohortManager.removeStudent('Bob', 'silver')
    expect(result).toEqual('Bob has been removed from Cohort silver')
  })

  it("The same student can't exist in multiple cohorts", () => {
    // set up
    cohortManager.createCohort('silver')
    cohortManager.createCohort('gold')
    const bob = cohortManager.createStudent(
      'Bob',
      'Belcher',
      'http',
      'bob@burger.com'
    )
    cohortManager.addStudent('Bob', 'silver')

    expect(() => cohortManager.addStudent('Bob', 'silver')).toThrow()
  })

  it("remove student not inside cohort", () => {
      // set up
      let rob = cohortManager.createStudent('Rob', "Belcher", "http", "bob@burger.com")

      expect(() => test.searchStudent(rob)).toThrow()
  })
})

