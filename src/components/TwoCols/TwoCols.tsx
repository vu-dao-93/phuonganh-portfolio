import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ImageSharp } from '../../types/image'

import './twoCols.sass'

type TwoColsProps = {
  image: ImageSharp | string,
  text: string,
  isImageRight: boolean,
  fullWidth: boolean
}

function TwoCols({ image, text, isImageRight, fullWidth } : TwoColsProps) {
  const content = (
    <div className="columns">
      <div className="column is-10 is-offset-1">
        <div className={"columns " + (isImageRight && 'flex-row-reverse')}>
          <div className="column is-6">
            <section className="section">
              <img src={(image && typeof image !== 'string') ? image.childImageSharp.fluid.src : image} />
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
  if (fullWidth) {
    return content
  }
  return (
    <section className="section">
      <div className="container">
        {content}
      </div>
    </section>
  )
}

export default TwoCols
