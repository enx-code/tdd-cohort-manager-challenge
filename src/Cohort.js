class Cohort {
  constructor(cohortName, capacity = 24) {
    this.cohortName = cohortName
    this.studentInside = []
    this.capacity = capacity
  }

  addStudent(student) {
    this.studentInside.push(student)
    return student
  }

  removeStudent(student) {
    const searchedStudent = this.searchStudent(student)
    if (searchedStudent) {
      const cohortIndex = this.studentInside.indexOf(student)
      this.studentInside.splice(cohortIndex, 1)
    }
  }

  searchStudent(student) {
    const foundStudent = this.studentInside.filter(
      (eachStudent) => eachStudent === student
    )

    if (foundStudent.length === 1) {
      return foundStudent
    }
    throw new Error(`Student ${student.name} isn't inside`)
  }
}

module.exports = Cohort
