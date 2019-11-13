module.exports = app => {
    const milk = require('./milk.controller.js')

    app.post('/milk', milk.create)

    app.get('/milk', milk.getAll)

    app.get('/milk/:milkId', milk.getOne)

    app.delete('/milk/:milkId', milk.delete)
}