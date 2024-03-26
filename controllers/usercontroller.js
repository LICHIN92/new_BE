const COURT = require('../models/courtmodel')

const getallcourtdata = ((req, res, next) => {
    try {
        COURT.find().then((result) => {
            // console.log(result);
            res.status(200).json(result)
        })
            .catch((err) => {
                next()
            })
    } catch (error) {

    }

})

const getsinglecourtdata = ((req, res, next) => {
    try {
        console.log(req.query.courtId);
        COURT.find({ _id: req.query.courtId })
            .then((result) => {
                console.log(result);
                res.status(200).json(result)
            }).catch((err) => {
                console.log(err);
            });
    } catch (error) {

    }
})
module.exports = { getallcourtdata, getsinglecourtdata }