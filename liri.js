require("dotenv").config();
// require("dotenv").config();

var keys = require ("./keys.js");

var search = process.argv;

var Spotify = require('node-spotify-api');

var fs = require("fs");

//functions
var song = function (songname){
 if (songname === undefined) {
   songname = "Ace of Base"
 }
}

 function spotifySongs() {

   var spotify = new Spotify({
   id: keys.spotify.id,
   secret: keys.spotify.secret
   });

   // spotify.get(function(query, hollaback){
   spotify.search({ type: "track", query: song }, function(err, data) {
   if (err) {
       return console.log('Error occurred: ' + err);
   }

   for (var i = 0; i < data.tracks.items.length; i++) {

   console.log( "artist:" + data.tracks.items[i].artists.map(song));
   console.log ("song name" + data.tracks.items[i].name)
 }
   });
}

var Twitter = require('twitter');
 
 function mytweets (){

   var client = new Twitter({
   consumer_key: keys.twitter.consumer_key,
   consumer_secret: keys.twitter.consumer_secret,
   access_token_key: keys.twitter.access_token_key,
   access_token_secret: keys.twitter.access_token_secret
   });
   
   var params = {screen_name: 'pippencoded1'};
   
   client.get('statuses/user_timeline', params, function(error, tweets, response) {
       
       if (!error) {
         for (var i = 0; i < tweets.length; i++){
       console.log(tweets[i].text);
       console.log(tweets[i].created_at);
       }  
   }
   });

}

mytweets();
spotifySongs();

var request = require("request");

var moviethis = function(movieName){
// Create an empty variable for holding the movie name
 var movieName = "";

 // Loop through all the words in the node argument
 // And do a little for-loop magic to handle the inclusion of "+"s
 for (var i = 2; i < search.length; i++) {

   if (i > 2 && i < search.length) {

     movieName = movieName + "+" + search[i];

   }

   else {

     movieName += search[i];

   }
 }

 // Then run a request to the OMDB API with the movie specified
 var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

 // This line is just to help us debug against the actual URL.
 console.log(queryUrl);

 request(queryUrl, function(error, response, body) {

   // If the request is successful
   if (!error && response.statusCode === 200) {

     // Parse the body of the site and recover just the imdbRating
     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
     console.log("Title: " + JSON.parse(body).Title);
     console.log("Release Year: " + JSON.parse(body).Year);
     console.log("Rated: " + JSON.parse(body).Rated);
     console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
     console.log("Country: " + JSON.parse(body).Country);
     console.log("Language: " + JSON.parse(body).Language);
     console.log("Plot: " + JSON.parse(body).Plot);
     console.log("Actors: " + JSON.parse(body).Actors);
    }})}