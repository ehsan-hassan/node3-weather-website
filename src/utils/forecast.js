const request = require("request");

const forecast = ({ latitude, longitude }, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a6426c5ad2936f02f77430acbb3006af&query=" +
    longitude +
    "," +
    latitude +
    "&units=m";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Can't connect to the waether service!", undefined);
    } else if (body.error) {
      callback("Please enter a valid location", undefined);
    } else {
      const { weather_descriptions, temperature, feelslike } = body.current;

      callback(
        undefined,
        weather_descriptions[0] +
          ". It is currently " +
          temperature +
          " degrees out. It feels like " +
          feelslike +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
