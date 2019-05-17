module.exports = (...allowed) => {
    const isAllowed = role => allowed.indexOf(role) > -1;

    // return a middleware
    return (req, res, next) => {
        console.log('checking role')
        const decoded = req.decoded;
        const role = decoded.role.name_en.toLowerCase();
        console.log(decoded)
        console.log(isAllowed(role))
        if (decoded && isAllowed(role))
            next(); // role is allowed, so continue on the next middleware
        else {
            res.status(403).json({message: "Forbidden"}); // user is forbidden
        }
    }
}
