var restify = require("restify"), utils = require("./utils"), models = require("./models"), db = require("./db"), log = require("./log")

module.exports = {
    start: function () {
        var server = restify.createServer({
        });

        server.get('/', function (req, res) {
            try {
                db.connect();
                models.Quote.find({
                }
                , function (err, docs) {
                    res.send(200, docs);
                });
            }
            catch (err) {
                log.errorAndReturn500(req, err);
            }
        });

        server.get('/testdata', function (req, res) {
            try {

                var quote = new models.Quote({
                    description: "My sister is boring mummy",
                    quoteFrom: "Sienna Britcliffe"
                });

                db.connect();
                quote.save(function (e) {
                    if (e) {
                        log.errorAndReturn500(req, err);
                    }
                    else {
                        res.send(201, quote);
                    }
                });
            }
            catch (err) {
                log.errorAndReturn500(req, err);
            }
        });

        server.listen(utils.getPort());
        console.log('Server running on ' + (utils.getPort()));
    }
}
