import React, { Component } from "react";
import PropTypes from "prop-types";

class News extends Component {
  render() {
    return (
      <div className="news">
        <div className="card card-body bg-light">
          <div className="row">
            <div className="col-lg-5 col-md-5">
              <img
                className="col-md-12 rounded"
                src={this.props.news.urlToImage}
                alt="Placeholder"
              />
            </div>
            <div className="col-md-7 text-left">
              <h3 className="">{this.props.news.title}</h3>
              <p>{this.props.news.description}</p>
              <a
                href={this.props.news.url}
                target="_blank"
                className="btn btn-default btn-sm"
              >
                Read More
              </a>
              <br />
              <br />
              <div className="row">
                <div className="col-md-6">
                  <i className="fas fa-pencil-alt mr-3" />
                  {this.props.news.author === null
                    ? "Anonymous"
                    : this.props.news.author}
                </div>
                <div className="col-md-6">
                  <i className="far fa-calendar-alt mr-3" />
                  {this.props.news.publishedAt.substring(0, 10)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

News.propTypes = {
  news: PropTypes.object.isRequired
};

export default News;
