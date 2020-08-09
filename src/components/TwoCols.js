import React from 'react'
import ReactMarkdown from 'react-markdown'

function TwoCols({ image, text }) {
  return (
    <div className="columns">
      <div className="column is-10 is-offset-1">
        <div className="columns">
          <div className="column is-6">
            <section className="section">
              <img src={!!image.childImageSharp ? image.childImageSharp.fluid.src : image} />
            </section>
          </div>
          <div className="column flex-vertical-center">
            <section className="section">
              <div className="content">
                <ReactMarkdown source={text} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwoCols
