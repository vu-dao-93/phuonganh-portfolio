import { graphql, StaticQuery, Link } from "gatsby";
import React from "react";

import "./featurePosts.sass";

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

function FeaturedPosts({ data }: { data: Data }) {
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="column is-12">
                  <h2 className="has-text-weight-semibold has-text-centered is-size-2">
                    Check out what I wrote
                  </h2>
                  <div className="columns is-multiline">
                    {data.allMarkdownRemark.nodes.map((post) => (
                      <div
                        key={post.fields.slug}
                        className="is-parent column is-6 feature-post"
                      >
                        <img
                          className="feature-post__thumbnail"
                          src={
                            post.frontmatter.featuredimage.childImageSharp.fluid
                              .src
                          }
                        />
                        <div className="feature-post__header has-text-centered">
                          <h3>{post.frontmatter.title}</h3>
                          <p>{post.excerpt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="column is-12 has-text-centered">
                    <Link className="btn feature-post__btn" to="/blog">
                      And more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default () => (
  <StaticQuery
    query={graphql`
      query FeaturedPostsQuery {
        allMarkdownRemark(
          filter: {
            frontmatter: {
              templateKey: { eq: "blog-post" }
              featuredimage: {
                childImageSharp: { fluid: { src: { ne: null } } }
              }
            }
          }
          limit: 2
          sort: { order: DESC, fields: frontmatter___date }
        ) {
          nodes {
            frontmatter {
              title
              featuredimage {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            excerpt(pruneLength: 35)
            fields {
              slug
            }
          }
        }
      }
    `}
    render={(data) => <FeaturedPosts data={data} />}
  />
);
