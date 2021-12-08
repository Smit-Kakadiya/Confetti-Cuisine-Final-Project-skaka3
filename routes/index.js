"use strict";

const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  subscriberRoutes = require("./subscriberRoutes"),
  courseRoutes = require("./courseRoutes"),
  vacationsRoutes = require("./vacationsRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes"),
  apiRoutes = require("./apiRoutes");
    
router.use("/api", apiRoutes);
router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/vacations", vacationsRoutes);


const request = require('request');
const apiKey = '36faacc22471bec6edccba62635a3847';

router.get('/weather', function (req, res) {
  res.render('vacations/weather', {weather: null, error: null});
});

router.post('/weather', function (req, res) {
  let city = req.body.city;
  let url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

  request(url, function (err, response, body) {
    let weather = JSON.parse(body);
    let weatherText = `It is ${weather.current.temperature} degrees celsius ${weather.current.is_day === "yes" ? 'Day time' : 'Night time'} in ${weather.location.name} , ${weather.location.country}!`;
    res.render('vacations/weather', {weather: weatherText, error: null});
  });
});




router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
