/**
 * Created by kaya on 4/16/2017.
 */
var request = require('request');
var express = require('express');
var spotcrime = require('spotcrime');
var app = express();

//define root for "/"
app.get('/', function (req,res) {
    res.sendFile(__dirname + '/index.html');
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
    /*spotcrime.getCrimes(location, radius, function (err, crimes) {
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
        
    });//getCrimes*/
    getCrimes(location, radius, function(err, crimes)
    {
        console.log("In the original function");
        if(err != null)
        {
            res.send("ERROR");
        }
        else
        {
            if(crimes == "[]")
            {
                //not worked
                res.send("No data Available");
            }
            else
            {
                res.send(crimes);
            }
        }
    });//getCrime
    function getCrimes(loc, radius, cb) {
        var baseUrl = "http://api.spotcrime.com/crimes.json";
        var key = "privatekeyforspotcrimepublicusers-commercialuse-877.410.1607";
        if (typeof radius === 'function') {
            cb = radius;
            radius = 0.01;
        }

        var rOpt = {
            url: baseUrl,
            json: true,
            qs: {
                lat: loc.lat,
                lon: loc.lon,
                key: key,
                radius: radius
            }
        };

        request(rOpt, function(err, res, body) {
            if (err) return cb(err);
            if (!body) return cb(new Error("No response"));
            cb(null, body.crimes);
        });


    }


});
app.listen(process.env.PORT || 8000);
console.log("http://localhost:8080")
