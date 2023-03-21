const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    Id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

module.exports = counterSchema;