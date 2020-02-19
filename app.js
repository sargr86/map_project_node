require('dotenv').config();
require('./constants/main');


server.listen(port);
// // Start server on pre-defined port
// server.listen(port,'192.168.1.126', ()=>{
//     console.log('test')
// });

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: postMaxSize + 'mb'}));


// Cors
app.use(cors(require('./config/cors')));

// Static resources
app.use('/uploads/', express.static(UPLOADS_FOLDER));


// Non-auth routes
app.use('/auth', require('./routes/auth'));
app.use('/apk', require('./routes/apk'));
app.use('/home', require('./routes/home'));
app.use('/ferries', require('./routes/ferries'));
app.use('/tours', require('./routes/tours'));
app.use('/food-drink', require('./routes/food_drink'));
app.use('/activities', require('./routes/activities'));
app.use('/accommodations', require('./routes/accommodations'));
app.use('/partners', require('./routes/partners'));
app.use('/companies', require('./routes/companies'));
app.use('/contacts', require('./routes/contacts'));

// Auth Routes
app.use('/users', checkAuth, require('./routes/users'));
app.use('/tour_types', require('./routes/tour_types'));
app.use('/activity_types', require('./routes/activity_types'));
app.use('/employees', checkAuth, require('./routes/employees'));
app.use('/customers', checkAuth, require('./routes/customers'));


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


let dist = path.join(__dirname, '../../secret_south/frontend/dist/front/');
if (process.env.NODE_ENV === 'production') {
    dist = path.join(__dirname, '../../secret_south/secret_south_angular/dist/front/')
}

app.use(express.static(dist));

// console.log('dist path:', dist)
// console.log(`${process.env.API_URL}auth/google/callback`)
// Separating Angular routes
app.get('*', (req, res) => {
    // if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    //     let url = `/var/www/html/secret_south/secret_south_angular/dist/front/${req.url}`;
    //     res.sendFile(url);
    // } else {
    //     console.log(req.url)
    //     res.sendFile(path.join(__dirname, '../../secret_south/secret_south_angular/dist/front/index.html'));
    // }

    app.get('*', (req, res, next) => {
        if (!req.url.includes('phpmyadmin')) {
            res.sendFile(dist + 'index.html');
        }
    });
});


// Passport.js config
const passport = require('passport');
require('./config/google-passport-strategy')(passport);
require('./config/facebook-passport-strategy')(passport);
app.use(passport.initialize({}));


app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(423).json({msg: 'File size exceeds maximum size of 1Mb'})
    }

    // Handle any other errors
});

