import React from 'react'

const Survey = (props) => {
    const { id, question, options } = props;
  return (
    <div>
    <h2>{question}</h2>
    <form>
      {options.map((option) => (
        <div key={option}>
          <label>
            <input type="radio" name={id} value={option} />
            {option}
          </label>
        </div>
      ))}
    </form>
  </div>
  )
}

export default Survey
