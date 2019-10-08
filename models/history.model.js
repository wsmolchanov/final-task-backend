let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HistorySchema = new Schema({
  formatted_address: String,
  date: String,
  weather: {
    dt_txt: String,
    temp: Number,
    description: String
  }

});

module.exports = mongoose.model('history', HistorySchema);