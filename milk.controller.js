const Milk = require('./milk.model.js')

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Milk content cannot be empty!"
        })
    }

    const milk = new Milk({
        name: req.body.name, 
        fat: req.body.fat,
        capacity: req.body.capacity,
        avgPrice: req.body.avgPrice
    })

    milk.save()
    .then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating the milk!"
        })
    })
}

exports.getAll = (req, res) => {
    Milk.find()
    .then(milk => {
        res.send(milk)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while retrieving milk!"
        })
    })
}

exports.getOne = (req, res) => {
    Milk.findById(req.params.milkId)
    .then(milk => {
        if(!milk) {
            return res.status(404).send({
                message: "Milk not found with id " + req.params.milkId
            })            
        }
        res.send(milk)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Milk not found with id " + req.params.milkId
            })                
        }
        return res.status(500).send({
            message: "Something went wrong retrieving milk with id " + req.params.milkId
        })
    })
}

exports.delete = (req, res) => {
    Milk.findByIdAndRemove(req.params.milkId)
    .then(milk => {
        if(!milk) {
            return res.status(404).send({
                message: "Milk not found with id " + req.params.milkId
            })
        }
        res.send({message: "Milk deleted successfully!"})
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Milk not found with id " + req.params.milkId
            })                
        }
        return res.status(500).send({
            message: "Could not delete milk with id " + req.params.milkId
        })
    })
}