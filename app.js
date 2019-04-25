require('dotenv').config();
require('./constants/main');
// const path = require('path');
// const fs = require('fs');

// Start server on pre-defined port
server.listen(port);

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: postMaxSize + 'mb'}));

// Cors
app.use(cors(require('./config/cors')));

// Static resources
app.use('/uploads/', express.static(UPLOADS_FOLDER));


app.use('/auth', require('./routes/auth'));
app.use('/home', require('./routes/home'));

// Auth Routes
app.use('/users', checkAdmin, require('./routes/users'));
app.use('/ferries', require('./routes/ferries'));
app.use('/tours', require('./routes/tours'));
app.use('/tour_types', checkAdmin, require('./routes/tour_types'));
app.use('/food-drink', require('./routes/food_drink'));
app.use('/activities', require('./routes/activities'));
app.use('/accommodations', require('./routes/accommodations'));
app.use('/partners', require('./routes/partners'));


// Allowed extensions list can be extended depending on your own needs
const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

// Separating Angular routes
app.get('*', (req, res) => {
    fixRoutes(req, res);

});

fixRoutes = (req, res) => {

    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        let url = `/var/www/html/secret_south/secret_south_angular/dist/front/${req.url}`;
        res.sendFile(url);
    } else {
        console.log(req.url)
        res.sendFile(path.join(__dirname, '../../secret_south/secret_south_angular/dist/front/index.html'));
    }
};


app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(423).json(err.code.toLowerCase())
    }

    // Handle any other errors
});

