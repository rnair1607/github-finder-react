import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.username);
  }

  render() {
    const {
      loading,
      user: {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
      },
    } = this.props;

    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Link to="/" className="btn btn-light">
              Back to search
            </Link>
            Hireable:{" "}
            {hireable ? (
              <i className="fas fa-check text-success" />
            ) : (
              <i className="fas fa-times-circle text-danger" />
            )}
            <div className="card grid-2">
              <div className="all-center">
                <img
                  src={avatar_url}
                  className="round-img"
                  style={{
                    width: "150px",
                  }}
                />
                <h1>{name}</h1>
                {location && <p>Location: {location}</p>}
              </div>
              <div>
                {bio && (
                  <>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                  </>
                )}
                <a
                  href={html_url}
                  className="btn btn-dark my-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Github Profile
                </a>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default User;
