let express = require('express');
let router = express.Router();
const validateSession = require('../middleware/validate-session');

const Log = require('../db').import('../models/log');

/* CREATE A LOG */
router.post('/create', validateSession, (req,res) => {
    console.log(req.username.id)
    const logEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.username.id
    }
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error: err}))
})

/* GET ALL LOGS BY USERNAME */

router.get('/mine', validateSession, (req,res) => {
    let usernameid = req.username.id
    Log.findAll({
        where: {owner_id: usernameid}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

/*GET LOGS BY ID */
router.get('/:id', function(req, res) {
    let owner_id = req.params.id;

    Log.findAll({
        where: {id: owner_id}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

/*UPDATE LOGS BY USER */
router.put('/update/:id', validateSession, function (req, res) {
    const updateLogEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.body.owner_id
    }
    const query = {where: {id: req.params.id}};

    Log.update(updateLogEntry, query)
    .then((logs) => res.status(200).json({message: "Log successfully updated!"}))
    .catch((err) => res.status(500).json({error: err}));
});

/*LOG DELETE */
router.delete("/delete/:id", validateSession, (req, res) => {
    const query = { where: { id: req.params.id, owner_id: req.username.id } };
    Log.destroy(query)
      .then((response) =>
        res.status(200).json({
          message: "Log Entry Removed",
        })
      )
      .catch((err) => res.status(500).json({ error: err }));
  });


module.exports = router