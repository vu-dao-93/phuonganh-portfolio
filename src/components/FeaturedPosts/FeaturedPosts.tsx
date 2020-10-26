import { Link } from "gatsby";
import React from "react";
import BlogRoll from '../BlogRoll'

import "./featurePosts.sass";

function FeaturedPosts() {
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
                  <BlogRoll />
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

export default FeaturedPosts;
