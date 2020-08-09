import React from 'react'

function Rating({ number, max=5 }) {
  return (
    <div className="rating">
      {Array.from({ length: max}, () => null).map((val, index) => {
        if (index + 1 - number <= 0) {
          return <div className="rating__star rating__star--full" />
        } else if (index + 1 - number === 0.5) {
          return <div className="rating__star rating__star--half" />
        }
        return <div className="rating__star rating__star--empty" />
      })}
    </div>
  )
}

export default Rating
