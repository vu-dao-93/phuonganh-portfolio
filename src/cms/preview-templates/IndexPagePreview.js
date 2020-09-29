import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'
import Layout from '../../components/Layout'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <Layout>
        <IndexPageTemplate
          image={getAsset(data.image)}
          title={data.title}
          heading={data.heading}
          subheading={data.subheading}
          description={data.description}
          intro={data.intro || { blurbs: [] }}
          mainpitch={data.mainpitch || {}}
          aboutMe={data.aboutMe || {}}
          aboutPage={data.aboutPage || {}}
          experience={data.experience || []}
          name={data.name}
          avatar={getAsset(data.avatar)}
          indexWidget={data.indexWidget}
        />
      </Layout>
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
