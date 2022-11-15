import React, { Component } from "react";
import AuthService from "../services/auth.service";
import NewsCard from "./news/NewsCard";
import WeatherCard from "./WeatherCard";
import ClothesCard from "./ClothesCard";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <>
        {currentUser ? (
          <div className="h-full">
            <h1 className="flex text-6xl font-semibold text-white flex justify-center items-center">
              Good day Swapnil
            </h1>

            <div className="flex justify-evenly items-center w-screen mt-20">
              <WeatherCard />
              <NewsCard />
              <ClothesCard />
            </div>

            <div className="flex justify-center items-end -mt-72 h-full text-white text-2xl">
              <a href="/" onClick={this.logOut}>
                Sign Out
              </a>
            </div>
          </div>
        ) : (
          <h1 className="text-6xl text-white flex h-1/6 justify-center items-center">
            USER LOGGED OUT
          </h1>
        )}
      </>
    );
  }
}
