import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import TwoCols from "../components/TwoCols";
import SkillGrid from "../components/SkillGrid";

const indexWidgetMap = {
  'twoCols': TwoCols,
  'skillGrid': SkillGrid,
}

export const IndexPageTemplate = ({
  indexWidget,
}) => (
  <div>
    {indexWidget && indexWidget.map(({ type, ...props}, index) => {
      const Widget = indexWidgetMap[type]
      return Widget ? <Widget key={index} {...props} /> : type;
    })}
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        indexWidget={frontmatter.indexWidget}
      />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        indexWidget {
          type
          image {
            childImageSharp {
              fluid(maxWidth: 1020, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          text
          isImageRight
          fullWidth
          heading
          item {
            level
            skill
          }
        }
      }
    }
  }
`;
