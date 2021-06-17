const express = require("express");
const app = express();
const path = require("path");
const Campground = require("./models/campground");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Start DB 
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// end DB

app.get("/", (req, res) => {
    res.render("home");
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    // structure template in different folders 
    res.render('campgrounds/index', { campgrounds })
});

app.get("/campgorunds/:id", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { Campground });
})

app.get("/makecampground", async (req, res) => {
    const camp = new Campground({ title: "My Backyard", description: "cheap camping" });
    await camp.save();
    res.send(camp)
});

app.listen(3000, () => {
    console.log("Serving on port 3000");
});



