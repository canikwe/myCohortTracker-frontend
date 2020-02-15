import React, { PureComponent } from 'react'
import students from "../helper/data.json"
import Column from '../components/Column'
import Row from '../components/Row'

class PairsContainer extends PureComponent {
  state = {
    activeStudent: null,
    crossStudentIndex: null
  }

  updateActiveStudent = (activeStudent, crossStudentIndex) => this.setState({ activeStudent, crossStudentIndex })

  render() {
    console.log(students)

    const { activeStudent, crossStudentIndex } = this.state

    return (
      <>
        <header className='pairs-header'>
          <p>//</p>
          {
            students.map(s => <Column key={s.id} student={s} allStudents={students} handleClick={this.updateActiveStudent}/>)
          }
        </header>
        <section className='pairs-row'>
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
      </>
    )
  }
}

export default PairsContainer