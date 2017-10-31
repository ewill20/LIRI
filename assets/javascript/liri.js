// Various keys from sources //
var keys = require('./keys.js');

// Dependencies //
var $ = require('jQuery');
var fs = require('fs');
var request = require('request');
var Spotify = require('node-spotify-api');
var spotifyClient = new Spotify ({
                	id: keys.spotifykeys.clientId,
                    secret: keys.spotifykeys.clientSecret,
                });
var twitter = require('twitter');
var twitterclient = new twitter({
    consumer_key: '5OLBsWMTMhmh1Oj3aIUKlfkkF',
    consumer_secret: 'SoR6cP9mlKey39vjWVt5sSnplBIi05j7JxxTtqdTI3tLHtQchB',
    access_token_key: '539295545-JextoeZDLMRTHi59tukElW7GPaOCaK3PHpalp9St',
    access_token_secret: 'Tq7X6XuhVxnp79WyhUcbFdY2FRVAd03i9DlC91Y9znEbE',
});



// Node arguments //
var nodeArgv = process.argv;
var demand = process.argv[2];
var demandArgument = process.argv[3];
var params = process.argv.slice(2);
var x = "";
// Attaches multiple word arguments //
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x = x + nodeArgv[i];
  }
}
    switch(demand){
        case "my-tweets":
            displayTweets();
            break;

        // case "My-IG":
        //     instagramPosts();
        //     break;
    
        case "spotify-this-song":
            if(x){
            spotifySong(x);
            } else {
                spotifySong("I Saw The Sign");
            }
            break;

        case "movie-this":
            if((x) || (demandArgument === undefined)) {
                runOMDB(x);
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

        // var app = {

        function displayTweets() {
            // Display the last 20 posts //
        var screenName = {screen_name: 'ewill20'};
        twitterclient.get('statuses/user_timeline', screenName, function(error, tweetData, response){
            if(!error) {
                for(var i = 0; i < tweetData.length; i++) {
                    var date = tweetData[i].created_at;
                    console.log('@ewill20: ' + tweetData[i].text + 'Created At: ' + date.substring(0, 20));
                    console.log("------------------");
                console.log(' ');
                console.log('=============My Tweets ============');
                tweetData.forEach(function(obj) {
                    console.log('-------------------');
                    console.log('Time: ' + obj.created_at);
                    console.log('Tweet: ' + obj.text);
                    console.log('-----------------');
                    console.log(' ');

                });
                }
            } else {
                console.log('An Error Occurred');
            }
            });
        }

        // function instagramFeed(ewill20) {
        //     // var handle = {handle: "ewill20"}

        //     // Fetch media by id //
        //     instagram.media.id("ewill20", function(images, error) {
        //         if(!error) {
        //             for (var i = 0; i < ewill20.data.length; i++);
        //             var feed = ewill20.data[i];
        //             var imgSrc = feed.images.standard.resolution.url;
        //             var userImg = feed.user.profile_picture;
        //             var userName = feed.user.username;

        //             $('.feed').append('<img src= "' + imgSrc + '">');
        //             $('.feed').append('<img src= "' + userImg + '" id="profile">' + '<p><a href="http://www.instagram.com/' + userName + '"target="_blank">' + userName + '</a></p>');
                    
        //             for (var x = 0; x < feed.tags.length; x++) {
        //                 var tag = feed.tags[x];
        //                 $('.feed').append('<li>' + tag + '</li>')
        //             }
        //         }
        //     });

        //     // Fetch popular media //
        //     // instagram.media.popular(function (images, error) {...});
        // }
// function spotifySong(song){
//   Spotify.search({ type: 'track', query: song}, function(error, data){
//     if(!error){
//       for(var i = 0; i < data.tracks.items.length; i++){
//         var songData = data.tracks.items[i];
//         //artist
//         console.log("Artist: " + songData.artists[0].name);
//         //song name
//         console.log("Song: " + songData.name);
//         //spotify preview link
//         console.log("Preview URL: " + songData.preview_url);
//         //album name
//         console.log("Album: " + songData.album.name);
//         console.log("-----------------------");
        
//         //adds text to log.txt
//         fs.appendFile('log.txt', songData.artists[0].name);
//         fs.appendFile('log.txt', songData.name);
//         fs.appendFile('log.txt', songData.preview_url);
//         fs.appendFile('log.txt', songData.album.name);
//         fs.appendFile('log.txt', "-----------------------");
//       }
//     } else{
//       console.log('Error occurred.');
//     }
//   });
// }
        function spotifySong(value) {
                
                    
          
            //     var songInfo = process.argv;
            //     songInfo.shift();
            //     songInfo.shift();
            //     request(spotifySong(songInfo.join('+')),

            //     // var queryString = process.argv[3];
            //     spotify.search({ type: 'track', query: queryString, limit: 1 }, function(err, data) {
            //         if (err) {
            //             console.log('error = ' + err);
            //         }
                
            //         console.log('spotify data = ', data);
            //         console.log(data.tracks.items[0]);

                
            //     }));
            // }
                 Spotify.search({type: 'track', query: value || 'ace of base the sign'}, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }
    else {
    console.log("/////////Data////////")
    console.log(data);
    console.log("///////Data.tracks.items///////")
    var spotifyCall = data.tracks.items[0];
    console.log(spotifyCall);
    console.log("/////////spotifyCall.artists[0].name////////");

// if no error, show me the information from the API
    console.log("\n/////////////////SPOTIFY THIS////////////////\n");
    var artist = spotifyCall.artists[0].name;
    console.log("Artist: " + artist);
    var song = spotifyCall.name;
    console.log("Song name: " + song);
    var preview = spotifyCall.preview_url;
    console.log("Preview Link: " + preview);
    var album = spotifyCall.album.name;
    console.log("Album: " + album);

}
});
}   
                    
        function runOMDB(movie) {
            var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true&apikey=40e9cece";
      		
          
          
            console.log(movie);
            console.log(queryURL)
            request(queryURL, function(error, response, body) {
                if(error) throw error;
                if(!error && response.statusCode == 200) {
                    var body = JSON.parse(body);
                    console.log("\n////////////////////Movie This//////////////\n");
                    console.log("Title: " + body.Title);
                    console.log("Release Year: " + body.Year);
                    console.log("IMdB Rating: " + body.imdbRating);
                    console.log("Country: " + body.Country);
                    console.log("Language: " + body.Language);
                    console.log("Plot: " + body.Plot);
                    console.log("Actors: " + body.Actors);
                    console.log("Rotten Tomatoes Rating: " + body.Metascore);
                    console.log("Rotten Tomatoes URL: " + body.tomatoURL);

                // Adds information to log.txt //
                fs.appendFile('log.txt', "Title: " + body.Title);
                fs.appendFile('log.txt', "Release Year: " + body.Year);
                fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
                fs.appendFile('log.txt', "Country: " + body.Country);
                fs.appendFile('log.txt', "Language: " + body.Language);
                fs.appendFile('log.txt', "Plot: " + body.Plot);
                fs.appendFile('log.txt', "Actors: " + body.Actors);
                fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.Metascore);
                fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);
                
                } if (response === undefined) {
                    runOMDB("Mr. Nobody");
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



    
