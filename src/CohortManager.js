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
  searchStudent(nameOrId) {
    const searchedId = this.searchStudentId(nameOrId)
    const searchedName = this.searchStudentName(nameOrId)
    if (searchedId !== undefined) {
      return searchedId
    }
    if (searchedName !== undefined) {
      if (searchedName.length > 1) {
        return searchedName
      }
      return searchedName[0]
    }
    throw new Error(`Student ${nameOrId} doesn't exist`)
  }

  deleteCohort(name) {
    const cohortToDelete = this.searchCohort(name)
    const cohortIndex = this.cohortList.indexOf(cohortToDelete)
    this.cohortList.splice(cohortIndex, 1)
  }

  addStudent(student, cohortName) {
    const studentFound = this.searchStudent(student)
    if (studentFound.length) {
      throw new Error(`There are many ${student}, try to search by ID`)
    }
    const cohort = this.searchCohort(cohortName)
    if (cohort.studentInside.length >= 24) {
      throw new Error(
        `There are too many student inside the ${cohortName} cohort`
      )
    }
    if (this.checkStudent(studentFound)) {
      cohort.addStudent(studentFound)
      return `${studentFound.name} is now inside Cohort ${cohort.cohortName}`
    }
    throw new Error(`Student already inside other cohort`)
  }

  checkStudent(student) {
    const searchedList = []
    for (let i = 0; i < this.cohortList.length; i++) {
      const searched = this.cohortList[i].studentInside.filter(
        (eachStudent) => eachStudent === student
      )
      if (searched.length > 0) {
        searchedList.push(...searched)
      }
    }
    if (searchedList.length < 1) {
      return true
    }
    return false
  }

  removeStudent(student, cohortName) {
    const studentFound = this.searchStudent(student)
    if (studentFound.length) {
      throw new Error(`There are many ${student}, try to search by ID`)
    }
    const cohort = this.searchCohort(cohortName)
    if (cohort.studentInside.length >= 24) {
      throw new Error(
        `There are too many student inside the ${cohortName} cohort`
      )
    }
    cohort.searchStudent(studentFound)
    cohort.removeStudent(studentFound)
    return `${studentFound.name} has been removed from Cohort ${cohort.cohortName}`
  }
}

module.exports = Cohortmanager
