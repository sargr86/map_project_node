module.exports = (name, lower = false) => {
    let res = name.replace(/ /g, "_").replace(/&/g, '');
    if (lower) res = res.toLowerCase();
    return res;
};
