import React, { Component } from "react";
import axios from "axios";

import Form from "../form/Form";
import Map from "../map/Map";
import NewsList from "../news/NewsList";
import mapAPI from "../../config/keys";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      country: "",
      latitude: "",
      longitude: "",
      src: "",
      glance: false,
      news: []
    };

    this.onFetchData = this.onFetchData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFetchNews = this.onFetchNews.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value, glance: false });
  }

  onSubmit(event) {
    event.preventDefault();

    const url = `//maps.googleapis.com/maps/api/staticmap?center=${
      this.state.city
    }&scale=1&size=800x400&maptype=roadmap&format=png&key=AIzaSyAyFOvgA-e3qcH_orW9-O67qHdcYnki6OU`;
    console.log(url);
    this.setState({ src: url, glance: true });
    this.onFetchData(this.state.city);
  }

  onFetchData(city) {
    axios
      .get(`/api/map/${city}`)
      .then(res => {
        this.setState({
          country: res.data.country,
          latitude: res.data.location.latitude,
          longitude: res.data.location.longitude
        });
        this.onFetchNews(city);
      })
      .catch(err => console.log(err));
  }

  onFetchNews(city) {
    axios
      .get(`/api/news/${city}`)
      .then(res => {
        this.setState({ news: res.data.articles });
        // console.log(res.data.articles);
      })
      .catch(err => console.log(err));
  }

  render() {
    let content;
    const { city, src, country, latitude, longitude, news } = this.state;
    let landing, landing_inner;
    if (this.state.glance) {
      content = (
        <div>
          <Map
            src={src}
            city={city}
            country={country}
            latitude={latitude}
            longitude={longitude}
          />
          <br />
          <br />
          <NewsList news={news} />
        </div>
      );
      landing = "";
      landing_inner = "";
    } else {
      content = "";
      landing = "landing";
      landing_inner = "dark-overlay landing-inner text-light";
    }

    return (
      <div className={landing}>
        <div className={landing_inner}>
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <Form
                  value={this.state.city}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  glance={this.state.glance}
                />
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
