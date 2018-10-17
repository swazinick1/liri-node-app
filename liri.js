
require('dotenv').config();
const inquirer = require ('inquirer');
const Spotify = require ('node-spotify-api');
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);
const request = require('request');
//
const Bandsintown = require('bandsintown');

const Omdb = require('omdbapi');


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
        spotify.search({ type: 'track', query: response.song }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            } let tracks = data.tracks.items; 
            for(let i = 0; i < tracks.length; i++){
                console.log(tracks[i].name);
                
                console.log(tracks[i].album.name);
                console.log(tracks[i].preview_url);
                console.log(tracks[i].artists.name);
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
     
     let movieChoice = request('http://www.omdbapi.com/?t='+response.movieChoice+'&y=&plot=full&tomatoes=true&apikey=trilogy', function(err, response, body){
     if(err) {  
     console.log('error:', err);
     } else {
         console.log(movieChoice);
         
         console.log(JSON.parse(body));
         
         
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
        
        request('https://rest.bandsintown.com/artists/${artist}/events?app_id=BANDSINTOWN_ID', function(err,response,body){
            if(err){
                console.log("error:", err);
            } else {
                console.log(JSON.parse(body));
            }
        });
    })
}

     

