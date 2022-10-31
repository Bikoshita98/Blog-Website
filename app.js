const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hi, I am Bikoshita Gogoi, an MCA graduate from Tezpur University.I have worked as an intern in an IT firm based in Noida, Uttar Pradesh for 6 months. Right now, I am looking for a full-time role as a MERN stack developer.I would be grateful and appreciate if I get an opportunity to expand my career from here onwards in a company that possesses great work ethics and values employees.";
const aboutContent = "I hail from Assam, India. Apart from coding I nurture various hobbies such as painting, reading books etc. I am exclusively careful towards having a healthy and fit body and that is why I try my best to hit the gym atleast for an hour.";
const contactContent = "You can mail me at: bikoshitagogoi@gmail.com and call me at 9954375474";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home.ejs", { startingContent: homeStartingContent, contents: posts });
})

app.get("/about", function (req, res) {
  res.render("about.ejs", { about: aboutContent });
})

app.get("/contact", function (req, res) {
  res.render("contact.ejs", { contact: contactContent });
})

app.get("/compose", function (req, res) {
  res.render("compose.ejs");
})

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);
  res.redirect("/");
})

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      })
    }
  })
})













app.listen(3000, function () {
  console.log("Server started on port 3000");
});
