import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: ""
    };

    this.getTemperature = this.getTemperature.bind(this);
  }

  getTemperature(city) {
    axios
      .get(`/api/temp/${city}`)
      .then(res => this.setState({ temp: res.data.message }))
      .catch(err => console.log(err));
  }

  render() {
    let content, hello;
    let input_css;
    if (!this.props.glance) {
      content = (
        <div className="m-auto col-md-6 col-lg-4 my-4 col-sm-6 col-xs-8">
          <input type="submit" className="ghost-button" value="Glance" />
        </div>
      );
      hello = "";
      input_css = "ghost-input";
    } else {
      this.getTemperature(this.props.value);
      hello = "Welcome, " + this.state.temp;
      content = "";
      input_css = "ghost-input-glance";
    }
    return (
      <div className="city-form">
        <form onSubmit={this.props.onSubmit}>
          <div className="text-center">
            <div className="m-auto col-md-12 col-lg-8 col-sm-12">
              <input
                name="city"
                type="text"
                value={hello === "" ? this.props.value : hello}
                onChange={this.props.onChange}
                className={input_css}
                placeholder="Enter a City"
                autoComplete="off"
                required
              />
            </div>
            {content}
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  glance: PropTypes.bool.isRequired
};

export default Form;
