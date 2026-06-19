const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const jobRoutes =
require("./routes/jobRoutes");

const thresholdRoutes =
require("./routes/thresholdRoutes");

const statsRoutes =
require("./routes/statsRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    message:
      "PlaceMux Job Service Running",
  });
});

app.use(
  "/api/jobs",
  jobRoutes
);

app.use(
  "/api/jobs",
  thresholdRoutes
);

app.use(
  "/api/stats",
  statsRoutes
);

module.exports = app;