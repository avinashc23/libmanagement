const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Avinash:Avi@2302@cluster0.hbln3.mongodb.net/librarymanagement", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const bookschema = {
    Title: String,
    Author: String,
    Subject: String,
    PublishDate: String
}

const Book = mongoose.model("Book", bookschema);



app.get("/", function(req, res) {
    Book.find({}, function(err, founditems) {
        res.render("list", { bookslist: founditems, Title: req.body.Title, Author: req.body.Author, Subject: req.body.Subject, PublishDate: req.body.PublishDate, message: "" })
    })
})

app.post("/filter", function(req, res) {
    Book.find({ Title: req.body.Title === "" ? { $exists: true } : req.body.Title.toUpperCase(), Title: req.body.Title === "" ? { $exists: true } : req.body.Title.toUpperCase(), Author: req.body.Author === "" ? { $exists: true } : req.body.Author.toUpperCase(), Subject: req.body.Subject === "" ? { $exists: true } : req.body.Subject.toLowerCase(), PublishDate: req.body.PublishDate === "" ? { $exists: true } : req.body.PublishDate }, function(err, founditems) {
        let count = founditems.length
        res.render("list", { bookslist: founditems, Title: req.body.Title, Author: req.body.Author, Subject: req.body.Subject, PublishDate: req.body.PublishDate, message: count <= 1 ? count + " book found" : count + " books found" })
    })
})


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function() {
    console.log("Server started succesfully");
});