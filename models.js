var mongoose = require('mongoose')
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var Quote = new Schema({
    description : { type: String, required: true }   
  , quoteFrom : { type: String, required: true }
  , createdAt : { type: Date, default: Date.now }
  , lastUpdatedAt : { type: Date, default: Date.now }
});

mongoose.model('Quote', Quote)
exports.Quote = mongoose.model('Quote');