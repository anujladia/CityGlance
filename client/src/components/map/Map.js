import React, { Component } from "react";
import PropTypes from "prop-types";

class Map extends Component {
  render() {
    return (
      <div className="col-md-12 border border-rounded border-warning">
        <div className="row p-4">
          <div className="col-md-8">
            <div className="col-md-12">
              <img width="100%" src={this.props.src} alt="Map of your city" />
            </div>
          </div>
          <div className="col-md-4">
            <h3>City Information</h3>
            <table className="table borderless text-left">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{this.props.city}</td>
                </tr>
                <tr>
                  <th>Country</th>
                  <td>{this.props.country}</td>
                </tr>
                <tr>
                  <th>Latitude</th>
                  <td>{this.props.latitude}</td>
                </tr>
                <tr>
                  <th>Longitude</th>
                  <td>{this.props.longitude}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  src: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired
};

export default Map;
