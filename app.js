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



// Admin middleware
app.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    // if(process.env.NODE_ENV === 'production'){
    //
    // }
    fixRoutes(req,res);
    if (!token) {
        res.status(500).json('Auth token is not supplied');
    }
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(500).json('Auth token is not supplied');
    }
    // next();
});

// Auth Routes
app.use('/users', require('./routes/users'));
app.use('/ferries', require('./routes/ferries'));
app.use('/tours', require('./routes/tours'));
app.use('/tour_types', require('./routes/tour_types'));
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
    console.log(process.env.NODE_ENV)
    fixRoutes(req,res);

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

