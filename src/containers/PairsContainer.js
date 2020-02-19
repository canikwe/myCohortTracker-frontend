import React, { PureComponent } from 'react'
// import allStudents from "../helper/data.json"
import Column from '../components/Column'
import Row from '../components/Row'
// import Form from '../components/Form.js'

// const BASE_URL = 'http://localhost:3000/'

class PairsContainer extends PureComponent {
  state = {
    // activeStudentX: null,
    // activeStudentY: null,
    // students: [],
    // groups: []
  }

  // componentDidMount() {
  //   fetch(BASE_URL + 'students')
  //   .then(res => res.json())
  //   .then(students => {
  //     students.sort((a, b) => a.first_name > b.first_name ? 1 : -1)
  //     this.setState({ students })
  //   })

  //   fetch(BASE_URL + 'groups')
  //   .then(res => res.json())
  //   .then(groups => this.setState({ groups }))
  // }

  // updateActiveStudents = (activeStudentX, activeStudentY) => this.setState({ activeStudentX, activeStudentY })

  // createGroup = data => {

  //   fetch(BASE_URL + 'groups', {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json', 'Accepted': 'application/json'},
  //     body: JSON.stringify({group: data})
  //   })
  //   .then(res => res.json())
  //   .then(group => this.setState({ groups: [...this.state.groups, group]}))

  // }

  render() {
    // const { activeStudentX, activeStudentY } = this.state
    const { groups, students, activeStudentX, activeStudentY, updateActiveStudents } = this.props


    return (
      <section className='pairs-container'>
        {/* <header className='pairs-header'>
          <p>//</p>
          {
            students.map(s => <Column key={s.id} student={s} allStudents={students} handleClick={this.updateActiveStudents}/>)
          }
        </header> */}
        
        <section className='pairs-cells'>
          <div>//</div>
          {
            students.map(studentY => <Column key={studentY.id} studentY={studentY} handleClick={updateActiveStudents}/>)
          }
          { students.map(studentX => {
            const studentGroups = groups.filter(g => g.student_ids.includes(studentX.id))
            return (
              <Row 
                key={studentX.id} 
                studentX={studentX} 
                allStudents={students} 
                studentGroups={studentGroups}
                activeStudentX={activeStudentX} 
                activeStudentY={activeStudentY}
                handleClick={updateActiveStudents}
              />
            )}
          )}
        </section>
{/* 
        <Form students={students} handleSubmit={this.createGroup}/> */}
      </section>
    )
  }
}

export default PairsContainer