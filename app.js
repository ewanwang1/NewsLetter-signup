const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    // console.log(firstName + " " + lastName + "'s email is " + email);

    const data = {
        members: [
            { 
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }

            }
        ]
    }

    const jsonData = JSON.stringify(data);


    //Note: for url, need to modify us(Number) based on api key and list_ID
    //Need to insert your own api key here 
    //Need to modfiy url for audienceLiST id
    const url = "https://us8.api.mailchimp.com/3.0/lists/urAudiencelist ID";
    const options = {
        method: "POST",
        auth: "insert your own api key"

    }

    const request = https.request(url, options, function (response) {
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});


app.post("/failure.html",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000");
});

