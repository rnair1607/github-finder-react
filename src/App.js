import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import Navbar from "./components/layouts/Navbar";
import User from "./components/users/User";
import Search from "./components/users/Search";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
    };
  }

  // async componentDidMount() {
  //   this.setState({
  //     loading: true,
  //   });

  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );

  //   this.setState({
  //     users: res.data,
  //     loading: false,
  //   });
  // }

  searchUsers = async (text) => {
    this.setState({
      loading: true,
    });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      users: res.data.items,
      loading: false,
    });
  };
  clearUsers = () => {
    this.setState({
      users: [],
    });
  };

  render() {
    return (
      <div className="app">
        <Navbar />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            showClear={this.state.users.length > 0}
            clearUsers={this.clearUsers}
          />
          <User loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
