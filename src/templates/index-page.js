import React from "react";
import ReactMarkdown from 'react-markdown'
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";
import TwoCols from "../components/TwoCols";

export const IndexPageTemplate = ({
  image,
  title,
  name,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
  experience,
  avatar,
  aboutMe,
  aboutPage,
  indexPage,
}) => (
  <div>
    <div className="columns">
      <div className="column is-10 is-offset-1">
        <div className="columns">
          <div className="column is-6">
            <section className="section">
              <img src={!!avatar.childImageSharp ? avatar.childImageSharp.fluid.src : avatar} />
            </section>
          </div>
          <div className="column flex-vertical-center">
            <section className="section is-size-5">
              <div className="content">
                <h1>{name}</h1>
                <ReactMarkdown source={aboutMe.content} />
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
    {indexPage.map(({ type, ...props}) => {
      switch (type) {
        case 'twoCols':
          
          return <TwoCols {...props} />
      
        default:
          return type;
      }
    })}
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  name: PropTypes.string,
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
  indexPage: PropTypes.arrayOf(PropTypes.object)
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        name={frontmatter.name}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        aboutMe={frontmatter.aboutMe}
        aboutPage={frontmatter.aboutPage}
        experience={frontmatter.experience}
        avatar={frontmatter.avatar}
        indexPage={frontmatter.indexPage}
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
        name
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
          content
          title
        }
        indexPage {
          type
          image {
            childImageSharp {
              fluid(maxWidth: 1020, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          text
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
