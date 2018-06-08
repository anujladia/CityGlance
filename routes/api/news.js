const express = require("express");
const router = express.Router();
const NewsAPI = require("newsapi");
const APIKey = require("./../../config/keys").newsAPI;
const newsapi = new NewsAPI(APIKey);

const City = require("../../models/City");

router.get("/test", (req, res) => res.json({ msg: "In News" }));

// @route   GET api/news/:city_name
// @desc    Get news for the city
// @access  Public
router.get("/:city_name", (req, res) => {
  City.findOne({ city_name: req.params.city_name })
    .then(city => {
      if (city) {
        const country = city.country_code;
        const header = {
          language: "en",
          country: country
        };
        console.log(country);
        newsapi.v2.topHeadlines(header).then(response => {
          const articles = [];
          if (response && response.status === "ok") {
            res.json(response);
            // response.articles.map(article => {
            //   const article = {

            //   }
            // });
          }
        });
      } else {
        res
          .status(404)
          .json({ citynotvalid: "Error fetching the city details" });
      }
    })
    .catch(err =>
      res.status(404).json({ citynotvalid: "Error fetching the city details" })
    );
});

module.exports = router;
