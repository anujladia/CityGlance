const express = require("express");
const router = express.Router();
const request = require("request");

const City = require("./../../models/City");

router.get("/test", (req, res) => res.json({ msg: "In Maps" }));

const APIKey = require("./../../config/keys").mapAPI;

// @route   GET api/map/:city_name
// @desc    Get latitude and longitude of the city
// @access  Public
router.get("/:city_name", (req, resp) => {
  City.findOne({ city_name: req.params.city_name })
    .then(res => {
      if (res) {
        resp.json(res);
      } else {
        const geoCodingURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${
          req.params.city_name
        }&key=${APIKey}`;

        request(geoCodingURL, function(err, response, data) {
          if (err) {
            res.status(404).json({ apierror: "Error fetching the data" });
          } else {
            let result = JSON.parse(data);
            //resp.json(result);
            if (result.status && result.status === "OK") {
              if (result.results.length) {
                const country = result.results[0].address_components.filter(
                  comp => {
                    if (comp.types.indexOf("country") === 0) {
                      return comp;
                    }
                  }
                );
                const city = new City({
                  city_name: req.params.city_name,
                  location: {
                    latitude: result.results[0].geometry.location.lat,
                    longitude: result.results[0].geometry.location.lng
                  },
                  country: country[0].long_name,
                  country_code: country[0].short_name
                });
                //console.log(city);
                city
                  .save()
                  .then(city => resp.json(city))
                  .catch(err => console.log(err));
              }
            } else {
              res.status(404).json({ statusnotok: "API is not working" });
            }
          }
        });
      }
    })
    .catch(err =>
      res.status(404).json({ databaseissue: "Mongoose not working properly" })
    );
});

module.exports = router;
