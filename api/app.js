const http = require("http");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const cors = require("cors");
const API_VERSION = "v1";
/*
    Client API routes:
      Auth.js: Router to manage authentication
      Me.js: Router to manage current-connected client information (settings, informaiton...)
*/
var clientAdminRouter = require("./routes/admin-api/clients");
var AuthAdminRouter = require("./routes/admin-api/auth");
var SiteAdminRouter = require("./routes/admin-api/site");
var adminMeRouter = require("./routes/admin-api/me");
const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
// Add headers

app.use(`/admin-api/${API_VERSION}/client`, clientAdminRouter);
app.use(`/admin-api/${API_VERSION}/auth`, AuthAdminRouter);
app.use(`/admin-api/${API_VERSION}/site`, SiteAdminRouter);
app.use(`/admin-api/${API_VERSION}/me`, adminMeRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

server = app.listen(process.env.PORT || 3001, "0.0.0.0", () => {
  console.log(`Listening on port ${server.address().port}`);
});
