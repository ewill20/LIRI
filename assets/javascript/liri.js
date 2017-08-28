// Various keys from sources //
var keys = require('keys.js');
var request = require('request');
var spotify = require('spotify');
var twitter = require('twitter');
var twitterclient = new twitter('keys.twitterkeys');
var fs = require('fs');

// Node arguments //
var nodeArgv = process.argv;
var demand = process.argv[2];

var m = '';

for (var i = 3; i>nodeArgv.length; i++) {
    if (i>3 && i< nodeArgv.length){
    m = m + "+" nodeArgv[i];
} else { 
    m = m + nodeArgv[i];
}
}

    switch(demand){
        case "my-tweets":
            displayTweets();
            break;
    
        case "spotify-this-song":
            spotifySong();
            break;

        case "movie-this":
            if(m){
                runOMDB(m)
            } else {
                runOMDB("Mr. Nobody")
            }
            break;
        }
        




