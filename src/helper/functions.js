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

export const filteredGroups = state => {
  let groups = state.groups

  if (state.filters.category !== 'all') {
    groups = groups.filter(g => g.activity.category.toLowerCase() === state.filters.category.toLowerCase())
  }
  if (state.filters.mod !== 'all') {
    groups = groups.filter(g => g.activity.mod === state.filters.mod)
  }
  return groups.filter(g => g.activity.name.includes(state.filters.term))
}

export const formatMatchedStudents = students => {
  switch (students.length) {
    case 1:
      return 'Solo'
    case 2:
      return students.join(' & ')
    default:
      const last = students.pop()
      return `${students.join(', ')}, & ${last}`
  }
}