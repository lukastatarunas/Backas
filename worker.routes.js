module.exports = app => {
    const workers = require('./worker.controller.js')

    app.post('/workers', workers.create)

    app.get('/workers', workers.getAll)

    app.get('/workers/:workerId', workers.getOne)

    app.delete('/workers/:workerId', workers.delete)
}