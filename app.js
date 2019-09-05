// dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const expressSanitizer = require("express-sanitizer");
const multer = require("multer");
// have to install method override to run other methods
// besides get and post
const methodOverride = require("method-override");
const LocalStrategy = require("passport-local");
const User = require("./models/User");
const flash = require("connect-flash");

// routes
const indexRoutes = require("./routes/index");
const popRoutes = require("./routes/pops");
const commentRoutes = require("./routes/comments");
const userProfileRoutes = require("./routes/userprofile");

const db = require("./util/config.env");
// db connection
mongoose.connect(db.mongoUrl, { useNewUrlParser: true });

// flash config
// flash has to come before passport config
app.use(flash());

// passport config
app.use(require("express-session")({
    secret: "phil is still awesome",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// method override config
app.use(methodOverride("_method"));
// app config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(expressSanitizer());

// tells app where to look to find routes
app.use(indexRoutes);
app.use(popRoutes);
app.use("/pops/:id/comments", commentRoutes);
app.use(userProfileRoutes);

// port to listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("baby twit started on port " + PORT);
});
