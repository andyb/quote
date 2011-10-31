module.exports = {
    //log the error
    error: function (req,ex) {
        console.log("Exception: " + ex + " req:" + req.url);
    }

    //log the error and return a 500 code
    ,errorAndReturn500: function(req,ex) {
        this.error(req,res);
        res.send(500);
    }
}