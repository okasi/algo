/**
 * Module dependencies.
 */

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const passport = require("passport");
const { TelegramStrategy } = require("passport-telegram-official");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const http = require("http");
const app = express();

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || "3000";
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);

/**
 * Event listener for HTTP server "listening" event.
 */
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.join(__dirname, "public")));
app.use(cors("*"));

//telegramStrat
passport.use(
  new TelegramStrategy(
    {
      botToken: process.env.TELEGRAM_BOT_TOKEN
    },
    function(profile, cb) {
      console.log(JSON.stringify(profile));
      // User.findOrCreate({ telegramId: profile.id }, function(err, user) {
      //   return cb(err, user);
      // });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

//tele
app.get("/api/auth/telegram", passport.authenticate("telegram"), function(
  req,
  res
) {
  // Successful authentication, redirect home.
  res.redirect("/");
});

module.exports = app;
