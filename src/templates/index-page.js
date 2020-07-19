import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
  experience,
  avatar,
  aboutMe,
  aboutPage,
}) => (
  <div>
    <div className="columns">
      <div className="column is-10 is-offset-1">
        <div className="columns">
          <div className="column is-6">
            <section className="section">
              <img src={avatar.childImageSharp.fluid.src} />
            </section>
          </div>
          <div className="column flex-vertical-center">
            <section className="section is-size-5">
              <div className="content">
                <h1 style={{ fontSize: '2.5em' }}>Phuong-Anh P. Nguyen</h1>
                <p>
                  On the path to build a content writer career, I’m not a
                  newbie, not yet an expert. Customer focused, detail and result
                  oriented are among my luggage. The next journey I’m looking
                  for is where I can learn more techniques, sharpen skills, and
                  feel free to be myself.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div>
                <Features gridItems={intro.blurbs} />
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

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  aboutMe: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        aboutMe={frontmatter.aboutMe}
        aboutPage={frontmatter.aboutPage}
        experience={frontmatter.experience}
        avatar={frontmatter.avatar}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
        avatar {
          childImageSharp {
            fluid(maxWidth: 1020, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        experience {
          company
          time
          title
        }
        aboutMe {
          content
          title
        }
        aboutPage {
          description
          title
        }
      }
    }
  }
`;
