/**
 * Created by kaya on 4/16/2017.
 */
var spotcrime = require('spotcrime');
var express = require('express');
var loc = {
    lat: 33.39657,
    lon: -112.03422
};

var radius = 0.01; // this is miles

spotcrime.getCrimes(loc, radius, function(err, crimes){

    console.log(crimes);

});
