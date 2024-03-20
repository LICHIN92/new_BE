const COURT = require('../models/courtmodel')

const getallcourtdata = ((req, res, next) => {
    try {
        COURT.find().then((result) => {
            res.status(200).json(result)
        })
            .catch((err) => {
                next()
            })
    } catch (error) {
        
    }
    
})
module.exports = { getallcourtdata }