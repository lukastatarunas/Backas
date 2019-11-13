const mongoose = require('mongoose')

const MilkSchema = mongoose.Schema({
    name: String,
    fat: Number,
    capacity: Number,
    avgPrice: Number
}, {
    timestamps: true
})

module.exports = mongoose.model('Milk', MilkSchema)