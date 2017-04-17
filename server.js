/**
 * Created by kaya on 4/16/2017.
 */
var express = require('express');
var spotcrime = require('spotcrime');
var app = express();

//define root for "/"
app.get('/', function (req,res) {
    res.sendfile('index.html');
})
app.get('/crime', function (req,res) {
    var latitude = req.query.lat;
    var longitude = req.query.lon;

    console.log("lat " + latitude);
    console.log("lon " + longitude);
    var location = {
        lat: latitude,
        lon: longitude
    };
    var radius = 0.01;//mile
    spotcrime.getCrimes(location, radius, function (err, crimes) {
        if(err !== null)
        {
            res.send("ERROR!!!");
        }
        else
        {
            if(crimes == "[]")
            {
                //not worked
                res.send("No Data Available");
            }
            res.send(crimes);
        }
        
    });//getCrimes

});
app.listen(8080);
console.log("http://localhost:8080")
