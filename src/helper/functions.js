export const getStudentGroups = (groups, student) => {
  return groups.filter(g => g.student_ids.includes(student.id))
}