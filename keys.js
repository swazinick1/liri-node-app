console.log('this is loaded');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

exports.ombd = {
    key: process.env.API_key
}

exports.bandsintown = {
    id: process.env.BANDSINTOWN_ID,
}