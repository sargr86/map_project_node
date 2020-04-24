module.exports = (promise,res = '') => {
    return promise.then(data => {
        // if(res) return res.json(data);
        // else
        // console.log(data)
            return data;
    })
    .catch(err => {
        console.log(err)
        if(res) {
            res.status(500).json(err);
        }
        else return err;
    });
};
