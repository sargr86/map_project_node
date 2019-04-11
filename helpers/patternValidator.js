const LATITUDE_PATTERN = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
const LONGITUDE_PATTERN = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

module.exports = (value, type) => {
    let pattern;
    switch (type) {
        case 'lat':
            pattern = LATITUDE_PATTERN;
            break;
        case 'lng':
            pattern = LONGITUDE_PATTERN;
            break;

    }

    return pattern.test(value);
}