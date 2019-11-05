const mongoose = require('mongoose')

const WorkerSchema = mongoose.Schema({
    name: String,
    surname: String,
    monday: Boolean,
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean,
    friday: Boolean,
    saturday: Boolean,
    sunday: Boolean
}, {
    timestamps: true
})

module.exports = mongoose.model('Workers', WorkerSchema)