const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CitySchema = new Schema({
  city_name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    }
  },
  country: {
    type: String,
    required: true
  },
  country_code: {
    type: String,
    required: true
  },
  news: [
    {
      author: {
        type: String
      },
      title: {
        type: String
      },
      description: {
        type: String
      },
      url: {
        type: String
      },
      urlToImage: {
        type: String
      },
      publishedAt: {
        type: Date
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = City = mongoose.model("cities", CitySchema);
