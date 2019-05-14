let originsWhitelist = [
    'http://localhost:4200', 
    'http://localhost:4202',
    'http://localhost:4201',     //this is my front-end url for development,
    'http://167.99.92.212:80'
];
let corsOptions = {
    origin: function(origin, callback){
        let isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials:true
};

module.exports = corsOptions;
