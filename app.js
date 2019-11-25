var express = require("express"), app = express(), nodemailer = require('nodemailer'), secret = require('./views/partials/js');
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.render("index");
});
app.get("/projects", function (req, res) {
    res.render("projects");
});
app.get("/contact", function (req, res) {
    res.render("contact");
});
// POST route from contact form
app.post('/contact', function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jatinderbirditech@gmail.com',
            pass: 'Kiranbirdi1@'
        }
    });
    var mailOptions = {
        from: req.body.email,
        to: 'jatinderbirditech@gmail.com',
        subject: 'Contact from Portfolio',
        html: req.body.name + " (" + req.body.email + ") says: " + req.body.message
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            res.render("mailSent");
        }
        else {
            console.log(info);
            res.render("mailSent");
        }
    });
});
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Application has been started");
// });
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Server running at port " + port);
});
