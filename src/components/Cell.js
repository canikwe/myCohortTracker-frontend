import React from 'react'

const Cell = ({ handleClick, classNames, student, index, pairs }) => {

    return (
      <div
        onClick={() => handleClick(student, index)}
        className={`cell${classNames(student, index)}`}
      >
        { pairs.map(p => <div key={p.id}>{p.name}</div>) }
      </div>
    )
}

export default Cell