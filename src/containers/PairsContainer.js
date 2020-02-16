import React, { PureComponent } from 'react'
import allStudents from "../helper/data.json"
import Column from '../components/Column'
import Row from '../components/Row'
import Form from '../components/Form.js'

const BASE_URL = 'http://localhost:3000/'

class PairsContainer extends PureComponent {
  state = {
    activeStudent: null,
    crossStudentIndex: null,
    students: allStudents
  }

  componentDidMount() {
    fetch(BASE_URL + 'students')
    .then(res => res.json())
    .then(students => this.setState({ students }))
  }

  updateActiveStudent = (activeStudent, crossStudentIndex) => this.setState({ activeStudent, crossStudentIndex })

  updateStudents = data => {
    const updatedStudents = this.state.students.map(s => {
      const newPairs = data.filter(p => p.first_student_id === s.id)
      return {...s, pairs: [...s.pairs, ...newPairs]}
    })

    this.setState({students: updatedStudents})
  }

  render() {
    const { activeStudent, crossStudentIndex, students } = this.state

    // console.log(students)

    return (
      <main className='pairs-container'>
        {/* <header className='pairs-header'>
          <p>//</p>
          {
            students.map(s => <Column key={s.id} student={s} allStudents={students} handleClick={this.updateActiveStudent}/>)
          }
        </header> */}
        
        <section className='pairs-cells'>
          <div>//</div>
          {
            students.map(s => <Column key={s.id} student={s} allStudents={students} handleClick={this.updateActiveStudent}/>)
          }
          { students.map(s => (
            <Row 
              key={s.id} 
              student={s} 
              allStudents={students} 
              activeStudent={activeStudent} 
              crossStudentIndex={crossStudentIndex}
              handleClick={this.updateActiveStudent}
            />
            )
          )}
        </section>

        <Form students={students} handleSubmit={this.updateStudents}/>
      </main>
    )
  }
}

export default PairsContainer