const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
  reciever: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const chatmodel = mongoose.model('Chat', chatSchema);

module.exports = chatmodel;