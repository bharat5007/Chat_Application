const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        default: [],
    }],

}, { timestamps: true }
);

const groupmodel = mongoose.model("Group", groupSchema);

module.exports=groupmodel;