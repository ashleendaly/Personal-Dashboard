import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        <div className="w-72 border-4 border-yellow-200 rounded text-lg">
          <h1 className="flex justify-center h-12  items-center font-semibold text-black  bg-yellow-200">
            News
          </h1>
          <h3 className="flex flex-col text-center h-28 items-center pt-3 px-5 bg-white/50">
            {this.state.recentNews.title}
            <Link className="font-semibold" to={"/news"}>
              Read more...
            </Link>
          </h3>
        </div>
      );
    } else {
      return (
        <div className="w-72 border-4 border-yellow-200 rounded text-lg">
          <h1 className="flex justify-center h-12  items-center font-semibold text-black  bg-yellow-200">
            News
          </h1>
          <h3 className="flex flex-col text-center h-28 items-center pt-3 px-5 bg-white/50">
            Loading...
          </h3>
        </div>
      );
    }
  }
}
