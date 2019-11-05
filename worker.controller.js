const Worker = require('./worker.model.js')

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Worker content cannot be empty!"
        })
    }

    const worker = new Worker({
        name: req.body.name, 
        surname: req.body.surname,
        monday: req.body.monday,
        tuesday: req.body.tuesday,
        wednesday: req.body.wednesday,
        thursday: req.body.thursday,
        friday: req.body.friday,
        saturday: req.body.saturday,
        sunday: req.body.sunday
    })

    worker.save()
    .then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating the worker!"
        })
    })
}

exports.getAll = (req, res) => {
    Worker.find()
    .then(workers => {
        res.send(workers)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while retrieving workers!"
        })
    })
}

exports.getOne = (req, res) => {
    Worker.findById(req.params.workerId)
    .then(worker => {
        if(!worker) {
            return res.status(404).send({
                message: "Worker not found with id " + req.params.workerId
            })            
        }
        res.send(worker)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Worker not found with id " + req.params.workerId
            })                
        }
        return res.status(500).send({
            message: "Something went wrong retrieving worker with id " + req.params.workerId
        })
    })
}

exports.delete = (req, res) => {
    Worker.findByIdAndRemove(req.params.workerId)
    .then(worker => {
        if(!worker) {
            return res.status(404).send({
                message: "Worker not found with id " + req.params.workerId
            })
        }
        res.send({message: "Worker deleted successfully!"})
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Worker not found with id " + req.params.workerId
            })                
        }
        return res.status(500).send({
            message: "Could not delete worker with id " + req.params.workerId
        })
    })
}