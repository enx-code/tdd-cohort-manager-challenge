const Cohort = require('./Cohort.js')
const Student = require('./Student.js')

class Cohortmanager {
  constructor() {
    this.studentList = []
    this.cohortList = []
    this.studentId = 1
  }

  createCohort(name) {
    if (name === null) {
      throw new Error('A Cohort must have a name')
    }
    if (typeof name !== 'string') {
      throw new Error('A Cohort must be a sequence of characters')
    }
    const searchedCohort = this.cohortList.find(
      (cohort) => cohort.cohortName === name
    )
    if (!searchedCohort) {
      const createdCohort = new Cohort(name)
      this.cohortList.push(createdCohort)
      return createdCohort
    }
    throw new Error(`${name} already used for another cohort`)
  }

  createStudent(firstname, surname, gitHub, email) {
    if (typeof firstname !== 'string' || typeof surname !== 'string') {
      throw new Error('You have to use a string to search')
    }
    const createdStudent = new Student(
      firstname,
      surname,
      this.studentId,
      gitHub,
      email
    )
    this.studentId++
    this.studentList.push(createdStudent)
    return createdStudent
  }

  searchCohort(name) {
    if (typeof name !== 'string') {
      throw new Error('You have to use a string to search')
    }
    const searchedCohort = this.cohortList.find((cohort) =>
      cohort.cohortName.includes(name)
    )
    if (searchedCohort) {
      return searchedCohort
    }
    throw new Error(`Cohort ${name} doesn't exist`)
  }
  searchStudentId(id) {
    if (typeof id !== 'number') {
      return
    }
    const searchedStudentId = this.studentList.find(
      (student) => student.id === id
    )
    if (searchedStudentId) {
      return searchedStudentId
    }
  }
  searchStudentName(name) {
    if (typeof name !== 'string') {
      return
    }
    const result = []
    const searchedStudentName = this.studentList.filter((student) =>
      student.name.includes(name)
    )
    const searchedStudentSurname = this.studentList.filter((student) =>
      student.surname.includes(name)
    )
    if (searchedStudentName !== undefined) {
      result.push(...searchedStudentName)
    }
    if (searchedStudentSurname !== undefined) {
      result.push(...searchedStudentSurname)
    }
    if (searchedStudentName || searchedStudentSurname) {
      return result
    }
  }
}

module.exports = Cohortmanager
