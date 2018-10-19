
require('dotenv').config();
const inquirer = require ('inquirer');
const Spotify = require ('node-spotify-api');
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);
const request = require('request');
let fs = require("fs");
//
const Bandsintown = require('bandsintown');

const Omdb = require('omdbapi');

let userInput = "";


inquirer
    .prompt([
        {
            type:"list",
            message: "what would you like to do?",
            choices:['concert-this', 'spotify-song', 'movie-this',
        'do-what-it-says'],
            name: 'lirioptions',

    }
])
    .then(function(inquirerResponse)
{
    if (inquirerResponse.lirioptions === "spotify-song"){
    thisSong();
    }
    else if(inquirerResponse.lirioptions === "concert-this"){
        concert();
    }
    else if(inquirerResponse.lirioptions === "movie-this"){
        movie();
    }
    else if(inquirerResponse.lirioptions === "do-what-it-says"){
        doWhat();
    }
    
})



const thisSong= function(){

    inquirer
    .prompt([
        {
          type: 'input',
          message: 'What song would you like?',
          name: 'song'  
        }
    ]).then(function(response){
        spotify.search({ type: 'track', query: response.song, limit: 5}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            } let tracks = data.tracks.items; 
            for(let i = 0; i < tracks.length; i++){
                console.log("Song Title:"+tracks[i].name);
                
                console.log("Album Name:"+tracks[i].album.name);
                console.log("Preview URL:"+tracks[i].preview_url);
                console.log("Artist Name:"+tracks[i].artists.name);
            }
            


          });
    })


};

const movie = function (){

    inquirer
    .prompt([
        {
            type: 'input',
            message:'what movie do you want?',
            name:'movieChoice'
        }
    ]).then(function(response){
     
      request('http://www.omdbapi.com/?t='+response.movieChoice+'&y=&plot=full&tomatoes=true&apikey=trilogy', function(err, response, body){
     if(err) {  
     console.log('error:', err);
     } else {
         let movieObj = JSON.parse(body);
         console.log(`
         Movie Title: ${movieObj.Title}
         Year Released: ${movieObj.Year}
         IMDB Rating: ${movieObj.Ratings[0].Value}
         Rotten Tomatoes Rating: ${movieObj.Ratings[1].Value}
         Produced in: ${movieObj.Country}
         Language(s): ${movieObj.Language}
         Plot: ${movieObj.Plot}
         Actors: ${movieObj.Actors}`)
        //  console.log(movieChoice);
         
        //  console.log(JSON.parse(body));
         
         
     }
    })
})
}




const concert = function(){
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What band are you interested in?',
            name: 'band'
        }
    ]).then(function(response){

      
        
    request('https://rest.bandsintown.com/artists/imaginedragons/events?app_id=4539bef5b014c1f99dee54825eb0cd7e', function(err,response,body){
        
            if(err){
                console.log("error:", err);
            } else {
                let data = JSON.parse(body);
                for(let i = 0; i < data.length; i++);
                console.log(body);
                
                
            }
        });
    })
}


const doWhat = function(){
    inquirer
    .prompt([
        {
            type: "confirm",
            message: "Are you sure you want to do what it says??",
            name: "confirmWhat",
            default: true
        }
    ]).then(function(response){
        fs.readFile('random.txt', 'UTF-8', function(error,data){
            if (error){
                return console.log(error);
            }
            console.log(data);
        })
        
    })
}

     

