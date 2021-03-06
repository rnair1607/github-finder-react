import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      users: [],
      loading: false,
      alert: null,
    };
  }

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

  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg,
        type,
      },
    });
    setTimeout(
      () =>
        this.setState({
          alert: null,
        }),
      5000
    );
  };

  getUser = async (name) => {
    this.setState({
      loading: true,
    });

    const res = await axios.get(
      `https://api.github.com/users/${name}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      user: res.data,
      loading: false,
    });
  };

  render() {
    return (
      <Router>
        <div className="app">
          <Navbar />
          <div className="container">
            {this.state.alert && <Alert alert={this.state.alert} />}
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <>
                    <Search
                      setAlert={this.setAlert}
                      searchUsers={this.searchUsers}
                      showClear={this.state.users.length > 0}
                      clearUsers={this.clearUsers}
                    />
                    <Users
                      loading={this.state.loading}
                      users={this.state.users}
                    />
                  </>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:username"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={this.state.user}
                    loading={this.state.loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
