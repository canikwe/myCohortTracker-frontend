export const getStudentGroups = (groups, student) => {
  return groups.filter(g => g.student_ids.includes(student.id))
}

export const getMatchedGroups = (student1, student2, groups) => {
  return groups.filter(g => {
    if (g.student_ids.length === 1 && student1 === student2) {
      return g.student_ids[0] === student1.id
    }
    return student1 !== student2 && g.student_ids.includes(student1.id) && g.student_ids.includes(student2.id)
  })
}