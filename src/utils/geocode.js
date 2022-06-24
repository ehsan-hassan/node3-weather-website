const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZWhzYW5oYXNzYW4iLCJhIjoiY2w0bnZyY3AwMDFuczNrbjVsbWV6ZHZkNCJ9.YRghg7ARruRUbBQbq1IT6g&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Can't connect to geo service", undefined);
    } else if (body.features[0]) {
      const data = body.features[0];
      const latitude = data.center[1];
      const longitude = data.center[0];
      const location = data.place_name;
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: location,
      });
    } else {
      callback("Please enter a valid address!", undefined);
    }
  });
};

module.exports = geocode;
