let express = require('express');
let router = express.Router();

const Log = require('../db').import('../models/log');

/* CREATE A LOG */
router.post('/create', (req,res) => {
    const logEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.body.owner_id
    }
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error: err}))
})

/* GET ALL LOGS BY USERNAME */

router.get('/mine', (req,res) => {
    let usernameid = req.username.id
    Log.findAll({
        where: {owner_id: usernameid}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router