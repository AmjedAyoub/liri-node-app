var Spotify = require('node-spotify-api');
require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


// ""

// node liri.js concert-this <artist/band name here>`
function liri(command, input) {
    if (command === "concert-this") {
        // ...


        // Then run a request with axios to the OMDB API with the movie specified
        var artistUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";


        // This line is just to help us debug against the actual URL.
        console.log(artistUrl);

        // Then create a request with axios to the artistUrl
        var axios = require("axios");

        // If the request with axios is successful
        axios.get(artistUrl).then(function(response) {

                var fs = require("fs");
                var moment = require("moment");
                for (let j = 0; j < response.data.length; j++) {
                    console.log(JSON.stringify(response.data[j].venue.name, null, 2));
                    console.log(JSON.stringify(response.data[j].venue.country, null, 2));
                    console.log(JSON.stringify(response.data[j].venue.region, null, 2));
                    console.log(JSON.stringify(response.data[j].venue.city, null, 2));
                    console.log(JSON.stringify(moment().format(response.data[j].venue.datetime), null, 2));



                    var text = "Name of the venue: " + JSON.stringify(response.data[j].venue.name, null, 2) + "\nVenue location:\n Country: " + JSON.stringify(response.data[j].venue.country, null, 2) + "\nRegion: " + JSON.stringify(response.data[j].venue.country, null, 2) + "\nCity: " + JSON.stringify(response.data[j].venue.city, null, 2) + "\nDate of the Event: " + JSON.stringify(moment().format(response.data[j].venue.datetime), null, 2) + "\n========================================================\n";
                    fs.appendFile("log.txt", text, function(err) {

                        // If an error was experienced we will log it.
                        if (err) {
                            console.log(err);
                        }

                        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                        else {
                            console.log("Content Added to loge.txt!");
                        }

                    });
                }
            })
            .catch(function(error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    } else if (command === "spotify-this-song") {

        var count = 0;
        spotify.search({ type: 'track', query: input }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            //   * If no song is provided then your program will default to "The Sign" by Ace of Base.
            // console.log(JSON.stringify(data, null, 2));
            for (let i = 0; i < data.tracks.items.length; i++) {

                console.log("Artist(s): " + data.tracks.items[i].album.artists[0].name);
                console.log("The song's name: " + data.tracks.items[i].album.name);
                console.log("A preview link of the song from Spotify: " + data.tracks.items[i].album.artists[0].external_urls.spotify);
                console.log("The album that the song is from: " + data.tracks.items[i].album.name);
                var fs = require("fs");
                var text = "Artist(s): " + data.tracks.items[i].album.artists[0].name + "\n" + "The song's name: " + data.tracks.items[i].album.name + "\n" + "A preview link of the song from Spotify: " + data.tracks.items[i].album.artists[0].external_urls.spotify + "\n" + "The album that the song is from: " + data.tracks.items[i].album.name + "\n========================================================\n";
                fs.appendFile("log.txt", text, function(err) {

                    // If an error was experienced we will log it.
                    if (err) {
                        console.log(err);
                    }

                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else {
                        console.log("Content Added to loge.txt!");
                    }

                });

            }

            if (data.tracks.items.length === 0) {
                liri("spotify-this-song", "The Sign");
            }


        });
    } else if (command === "movie-this") {

        if (input === "") { input = "Mr. Nobody"; }

        var axios = require("axios");

        // Run the axios.get function...
        // The axios.get function takes in a URL and returns a promise (just like $.ajax)
        axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
                function(response) {
                    console.log("Title of the movie: " + response.data.Title);
                    console.log("Year the movie came out: " + response.data.Year);
                    console.log("IMDB Rating of the movie: " + response.data.Rated);
                    console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[2].Value);
                    console.log("Country where the movie was produced: " + response.data.Country);
                    console.log("Language of the movie: " + response.data.Language);
                    console.log("Plot of the movie: " + response.data.Plot);
                    console.log("Actors in the movie: " + response.data.Actors);
                    var fs = require("fs");
                    var text = "Title of the movie: " + response.data.Title + "\n" + "Year the movie came out: " + response.data.Year + "\n" + "IMDB Rating of the movie: " + response.data.Rated + "\n" + "Rotten Tomatoes Rating of the movie: " + response.data.Ratings[2].Value + "\n" + "Country where the movie was produced: " + response.data.Country + "\n" + "Language of the movie: " + response.data.Language + "\n" + "Plot of the movie: " + response.data.Plot + "\n" + "Actors in the movie: " + response.data.Actors + "\n========================================================\n";
                    fs.appendFile("log.txt", text, function(err) {

                        // If an error was experienced we will log it.
                        if (err) {
                            console.log(err);
                        }

                        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                        else {
                            console.log("Content Added to loge.txt!");
                        }

                    });
                })
            .catch(function(error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    } else if (command === "do-what-it-says") {
        var fs = require("fs");
        fs.readFile("random.txt", "utf8", function(err, data) {
            if (err) {
                return console.log(err);
            }

            data = data.split(",");
            liri(data[0], data[1]);
        });
    }
}

var inp = process.argv.slice(3).join(" ");

liri(process.argv[2], inp);