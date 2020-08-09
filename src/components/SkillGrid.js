import React from 'react'
import Rating from './Rating'

function SkillGrid({ heading, item }) {
  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h3 className="has-text-weight-semibold is-size-2">{heading}</h3>
              <div>
                {item.length && item.map(({ skill, level }) => (
                  <div>{skill} <Rating number={level} /></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
    </section>
  )
}

export default SkillGrid
