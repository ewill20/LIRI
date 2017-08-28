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
            
        case "do-what-it-says":
            followCommand();
            break;
            
        default:
            console.log("Please Enter One Of The Following Commands: My-tweets, spotify-this-song, movie-this, do-what-it-says");
            break;
        }

        function displayTweets() {
            // Display the last 20 posts //
        var screenName = {screenName: "ewill20"}
        client.get('statuses/user_timeline', screenName, function(error, tweets, response){
            if(!error) {
                for (var i = 0; i < tweets.length; i++) {
                    var date = tweets[i].created_at;
                    console.log('@ewill20: ' + tweets[i].text + 'Created At: ' + date.substring(0, 19));
                    console.log("------------------");

                    // adds text to log.txt file //
                    fs.appendFile('log.txt', "@ewill20: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                    fs.appendFile('log.txt', "---------------");
                }
            } else {
                console.log('An Error Occurred');
            }
        });
        }

        function spotifySong() {
            spotify.search({ type: 'track', query: song}, function(error, data) {
                if(!error) {
                    for (var i = 0; i < data.tracks.items.length; i++) {
                        var songInfo = data.tracks.items[i];
                    // Artist Information //
                    console.log("Artist: " + songInfo.artists[0].name);
                    // Song Name //
                    console.log("Song: " + songInfo.name);
                    // Spotify Preview //
                    console.log("Preview URL: " + songInfo.preview_url);
                    // Album Name //
                    console.log("Album: " + songInfo.album.name);
                    console.log("--------------");

                    // Adds information to log.txt //
                    fs.appendFile('log.txt', songInfo.artists[0].name);
                    fs.appendFile('log.txt', songInfo.name);
                    fs.appendFile('log.txt', songInfo.preview_url);
                    fs.appendFile('log.txt', songInfo.album.name);
                    fs.appendFile('log.txt', "---------------");
                    }
                } else {
                    console.log("An Error Occurred");
                }
            });
        }

        function runOMDB(movie) {
            var omdbURL = "http//www.omdbapi.com/?t=" + movie + "&plot=short&tomatoes=true";

            request(omdbURL, function(error, response, body) {
                if(!error && response.statusCode == 200) {
                    var body = JSON.parse(body);

                    console.log("Title: " + body.Title);
                    console.log("Release Year: " + body.Year);
                    console.log("IMdB Rating: " + body.imdbRating);
                    console.log("Country: " + body.Country);
                    console.log("Language: " + body.Language);
                    console.log("Plot: " + body.Plot);
                    console.log("Actors: " + body.Actors);
                    console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
                    console.log("Rotten Tomatoes URL: " + body.tomatoURL);


                // Adds information to log.txt //
                fs.appendFile('log.txt', "Title: " + body.Title);
                fs.appendFile('log.txt', "Release Year: " + body.Year);
                fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
                fs.appendFile('log.txt', "Country: " + body.Country);
                fs.appendFile('log.txt', "Language: " + body.Language);
                fs.appendFile('log.txt', "Plot: " + body.Plot);
                fs.appendFile('log.txt', "Actors: " + body.Actors);
                fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
                fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);
                
                } else {
                    console.log("An Error Occurred");
                }
                if (movie === "Mr. Nobody") {
                    console.log("-----------------");
                    console.log("If you haven't watched 'Mr. Nobody' then you should: http://www.imdb.com/title/tt0485947/");
                    console.log("It can also be found on Netflix!");

                    // Adds information to log.txt //
                    fs.appendFile('log.txt', "-----------------");
                    fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody' then you should: http://www.imdb.com/title/tt0485947/");
                    fs.appendFile('log.txt', "It can also be found on Netflix!");
                }
            });
        }
             
        function followCommand() {
            fs.readFile('random.txt', "utf8", function(error, data) {
                var txt = data.split(',')

                spotifySong(txt[1]);
            });
        }




