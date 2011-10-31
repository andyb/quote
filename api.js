var restify = require("restify"), utils = require("./utils"), models = require("./models"), db = require("./db"), log = require("./log"), static = require('node-static');

module.exports = {
    start: function () {
        var file = new (static.Server)('./');
        var server = restify.createServer({
            accept: ["text/xml", "text/html", "application/xhtml+xml", "text/plain", "*/*;q=0.8", "image/png", "image/*;q=0.8", "*/*;q=0.5"]
        });

        server.get('/public/:fileName', function (req, res) {
            console.log("SERVING FILE");
            file.serve(req, res);
        });

        server.get('/', function (req, res) {
            file.serveFile('public/index.html', 200, {}, req, res);
        });

        server.get('/quotes', function (req, res) {
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
