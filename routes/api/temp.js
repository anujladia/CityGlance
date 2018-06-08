const express = require("express");
const router = express.Router();
const request = require("request");
const APIKey = require("./../../config/keys").tempAPI;

router.get("/test", (req, res) => res.json({ msg: "In Temp" }));

//const APIKey = "b53eec7dc4712979e6d40acb11f09a81";

// @route   GET api/map/:city_name
// @desc    Get temperature of the city
// @access  Public
router.get("/:city_name", (req, res) => {
  let city = req.params.city_name;
  let url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    APIKey;

  request(url, function(err, response, body) {
    if (err) {
      res.status(404).json({ error: "Error, Please try again" });
    } else {
      let weather = JSON.parse(body);

      if (weather.main == undefined) {
        res.status(404).json({ error: "Error, Please try again" });
      } else {
        let message =
          "It's " + weather.main.temp + " degrees in " + weather.name;
        res.json({ message: message });
      }
    }
  });
});

module.exports = router;
