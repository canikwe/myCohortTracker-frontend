import React, { PureComponent } from 'react'

class Cell extends PureComponent {
  render(){
    const { handleClick, classNames, student, index, pairs } = this.props
    return (
      <div
        onClick={() => handleClick(student, index)}
        className={`cell${classNames(student, index)}`}
      >
        { pairs.map(p => <div>{p.name}</div>) }
      </div>
    )
  }
}

export default Cell