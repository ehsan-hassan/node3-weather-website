const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirPath));
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app title",
    name: "Ehsan Hassan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ehsan Hassan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Ehsan Hassan",
    helpMessage: "Help page",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: "Address should be provided!" });
  }
  geocode(address   , (error, data) => {
    if (error) {
      return res.send({ error });
    }

    forecast(data, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address,
        location: data.location,
        forecast: forecastData,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error",
    name: "Ehsan Hassan",
    errorMessage: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error",
    name: "Ehsan Hassan",
    errorMessage: "Page not found!",
  });
});

app.listen(port, () => {
  console.log("Server started");
});
