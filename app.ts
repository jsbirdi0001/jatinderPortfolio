var express = require("express"),
    app = express(),
    nodemailer = require('nodemailer'),
    secret = require('./views/partials/js');
    
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
    
app.get("/",function(req,res){
    res.render("index");
})

app.get("/projects",function(req,res){
    res.render("projects")
})

app.get("/contact",function(req,res){
    res.render("contact");
})

// POST route from contact form
app.post('/contact', function (req, res) {
  var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
            user: 'jatinderbirditech@gmail.com',
            pass: 'Kiranbirdi1@'
        }
    });
    
    const mailOptions = {
        from: req.body.email,
        to: 'jatinderbirditech@gmail.com',
        subject: 'Contact from Portfolio',
        html: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
       if(err){
           console.log(err);
           res.send("<h1 style='text-align:center'> Error Send Mail </h1> <a href='/'><button>Go Back</button></a>")
       }
       else {
         console.log(info);
         res.render("mailSent")
       }
    });
});
    
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Application has been started");
// });

const port=process.env.PORT || 8080;

app.listen(port,() => {
console.log(`Server running at port ${port}`);
});