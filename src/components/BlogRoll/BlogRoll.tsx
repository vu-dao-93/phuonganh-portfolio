import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";

import "./blogRoll.sass";

type Post = {
  frontmatter: {
    title: string;
    featuredimage: {
      childImageSharp: {
        fluid: {
          src: string;
        };
      };
    };
  };
  excerpt: string;
  fields: {
    slug: string;
  };
};

type Data = {
  allMarkdownRemark: {
    nodes: [Post];
  };
};

function BlogRoll({ data }: { data: Data }) {
  const posts = data.allMarkdownRemark.nodes;
  return (
    <div className="columns is-multiline">
      {posts &&
        posts.map((post) => (
          <Link
            to={post.fields.slug}
            key={post.fields.slug}
            className="is-parent column is-6 blog-item"
          >
            <img
              className="blog-item__thumbnail"
              src={post.frontmatter.featuredimage.childImageSharp.fluid.src}
            />
            <div className="blog-item__header has-text-centered">
              <h3>{post.frontmatter.title}</h3>
              <p>{post.excerpt}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: {
              templateKey: { eq: "blog-post" }
              featuredimage: {
                childImageSharp: { fluid: { src: { ne: null } } }
              }
            }
          }
        ) {
          nodes {
            excerpt(pruneLength: 35)
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              featuredpost
              featuredimage {
                childImageSharp {
                  fluid(maxWidth: 500, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <BlogRoll data={data} />}
  />
);
