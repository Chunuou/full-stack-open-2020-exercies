import React from 'react'

const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => parts.map(part => <Part part={part} key={part.id} />)

const Total = ({ parts }) => {
  let total = parts.reduce(((total, part) => total += part.exercises), 0)
  return <h3>total of {total} exercises</h3>
}

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

export default Course;