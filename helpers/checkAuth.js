module.exports = (req, res, next) => {
    let token = req.headers['authorization']; // Express headers are auto converted to lowercase
    // if(process.env.NODE_ENV === 'production')
    if (!token) {
        res.status(500).send('Auth token is not supplied');
    } else {

        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            console.log(token)
            token = token.slice(7, token.length);
        }
        // else if (token.startsWith('Basic ')) {
        //     token = token.slice(6, token.length);
        // }
        console.log(token)
        console.log(token.includes('Bearer '))
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                console.log(err)
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                return next();
            }
        });
    }
};
