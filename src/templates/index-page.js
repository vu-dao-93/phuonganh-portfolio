import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import TwoCols from "../components/TwoCols";
import SkillGrid from "../components/SkillGrid";
import FeaturedPosts from "../components/FeaturedPosts";

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
    <FeaturedPosts />
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
          yellowBg
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
