import React, { Component } from "react";
import PropTypes from "prop-types";
import News from "./News";
import Spinner from "../common/Spinner";

class NewsList extends Component {
  render() {
    let content;

    //console.log(this.props.news);

    let newsArray = this.props.news;

    if (newsArray == null) {
      content = (
        <div className="m-auto">
          <Spinner />
        </div>
      );
    } else {
      if (newsArray.length > 0) {
        content = newsArray.map((news, index) => {
          return (
            <div key={index} className="col-md-12 col-sm-6 mb-4">
              <News news={news} />
            </div>
          );
        });
      } else {
        content = (
          <div className="mx-auto border border-danger rounded bg-light p-3 mb-5">
            <p className="lead">No News to show</p>
          </div>
        );
      }
    }

    return (
      <div className="news-list">
        <div className="col-md-12 border border-rounded border-info">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center mt-5">Your News</h1>
                <p className="lead text-center">
                  Best way to have a social chat is remain updated
                </p>
                <br />
                <div className="mt-5 row">{content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewsList.propTypes = {
  news: PropTypes.array.isRequired
};

export default NewsList;
