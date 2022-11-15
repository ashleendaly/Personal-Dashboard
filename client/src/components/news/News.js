import React, { Component } from "react";
import Picture from "../../assets/Add_picture.png";

export default class NewsCard extends Component {
  constructor() {
    super();
    this.state = {
      recentNews: {
        title: "",
        thumbnail: "",
        description: "",
      },
    };
  }

  FetchDataFromRssFeed() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        var myObj = JSON.parse(request.responseText);

        this.setState({
          recentNews: {
            title: myObj.items[0].title,
            thumbnail: myObj.items[0].thumbnail,
            description: myObj.items[0].description,
          },
        });
      }
    };
    request.open(
      "GET",
      "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml",
      true
    );
    request.send();
  }

  componentDidMount() {
    this.FetchDataFromRssFeed();
  }

  render() {
    if (this.state.recentNews.title) {
      return (
        <div>
          <h1 className="flex text-6xl font-semibold text-white flex justify-center items-center">
            News
          </h1>
          <div className="flex justify-center py-10">
            <img src={Picture} alt="add"></img>
          </div>
          <div className="flex text-4xl px-10 py-5 font-semibold text-white text-center flex justify-center">
            {this.state.recentNews.title}
          </div>
          <div className="flex text-lg px-10 py-2 text-white text-center flex justify-center">
            {this.state.recentNews.description}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="flex text-6xl font-semibold text-white flex justify-center items-center">
            Loading
          </h1>
        </div>
      );
    }
  }
}
