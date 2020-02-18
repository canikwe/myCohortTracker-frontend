import React, { useState } from 'react'

const Form = ({ students, handleSubmit }) => {
  const [studentIds, updateStudentIds] = useState([])
  const [name, updateName] = useState('')


  const submitForm = e => {
    e.preventDefault()
    const data = { name, student_ids: studentIds }

    // pairs.forEach(s1 => {
    //   pairs.forEach(s2 => s1 !== s2 ? data.push(generatePair(s1, s2)) : null )
    // })

    handleSubmit(data)
    updateStudentIds([])
  }

  const handleSelection = e => {
    const id = parseInt(e.target.value)
    console.log(studentIds.includes(id))
    if (studentIds.includes(id)) {
      updateStudentIds(studentIds.filter(i => i !== id))
    } else {
      updateStudentIds([...studentIds, id])
    }
  }

  // const generatePair = (first_student_id, second_student_id) => {
  //   return ({
  //       id: Math.floor(Math.random() * 10000),
  //       first_student_id, 
  //       second_student_id,
  //       name
  //     })
  // }

  return (
    <aside>
      <h3>Create Pairs</h3>
      <form onSubmit={submitForm}>
        <label htmlFor='Students'>Students</label>
        <select multiple onChange={handleSelection}>
          {
            students.map(s => (
              <option key={s.id} value={s.id}>{s.first_name}</option>
            ))
          }
        </select>
        <p />
        <label htmlFor='Name'>Name</label>
        <input type='text' value={name} onChange={e => updateName(e.target.value)} />
        <p />
        <input type='submit' value="Add/Update" />
      </form>
    </aside>
  )
}

export default Form