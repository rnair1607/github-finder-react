import React, { Component } from "react";

class Search extends Component {
  state = {
    search: "",
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.search === "") {
      return this.props.setAlert("Please enter something", "light");
    }
    this.props.searchUsers(this.state.search);
    this.setState({
      search: "",
    });
  };

  isDisabled = () => this.state.search.length < 1;

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="search"
            placeholder="Search users..."
            value={this.state.search}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
            // disabled={this.isDisabled()}
          />
        </form>
        {this.props.showClear && (
          <button
            className="btn btn-light btn-block"
            onClick={this.props.clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
