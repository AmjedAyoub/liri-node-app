require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
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
        axios.get(artistUrl).then(
                function(response) {
                    console.log("response");
                    console.log(response);
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

        spotify.search({ type: 'track', query: input }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(JSON.stringify(data, null, 2));
            // console.log(data.album);

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