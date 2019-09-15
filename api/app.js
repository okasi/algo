const cookieParser = require("cookie-parser");
const express = require("express");
const httpErrors = require("http-errors");
const logger = require("morgan");
const path = require("path");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", indexRouter);

const dotenv = require("dotenv");
dotenv.config();

//telegram passport
passport.use(
  new TelegramStrategy(
    {
      botToken: process.env.TELEGRAM_BOT_TOKEN
    },
    function(profile, cb) {
      User.findOrCreate({ telegramId: profile.id }, function(err, user) {
        return cb(err, user);
      });
    }
  )
);

app.get("/auth/telegram", passport.authenticate("telegram"), function(
  req,
  res
) {
  // Successful authentication, redirect home.
  res.redirect("/");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
