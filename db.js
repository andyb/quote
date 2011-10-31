var mongoose = require('mongoose');

var mongoConfig = 
{
    credentials: {
        username: "admin",
        password: "password",
        hostname: "localhost",
        port: 27017,
        db: "quotedb"
    },
};

module.exports = {
    getConnectionString: function () {
        return "mongodb://" + mongoConfig.credentials.hostname + ":" + mongoConfig.credentials.port + "/" + mongoConfig.credentials.db;
    },
    connect: function() {
        mongoose.connect(this.getConnectionString());
    }
}
