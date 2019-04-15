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


// Auth Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/ferries', require('./routes/ferries'));
app.use('/tours', require('./routes/tours'));
app.use('/tour_types', require('./routes/tour_types'));
app.use('/partners', require('./routes/partners'));
app.use('/home', require('./routes/home'));

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'../../secret_south/secret_south_angular/dist/front'))
});


app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(423).json(err.code.toLowerCase())
    }

    // Handle any other errors
});

