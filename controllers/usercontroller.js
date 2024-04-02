const COURT = require('../models/courtmodel')
const COURT_SCHEDUELS = require('../models/courtSchedule')
const ObjectId = require('mongoose').Types.ObjectId

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
                // console.log(result);
                res.status(200).json(result)
            }).catch((err) => {
                console.log(err);
            });
    } catch (error) {

    }
})

// const getslotsdata = ((req, res) => {
//     let currentHour = 0
//     let currentDate = new Date(req.query.date)
// console.log(req.query.date);
//     if (new Date(new Date().setUTCHours(0,0,0,0)) === currentDate) {
//         currentHour = new Date().getHours()
//         console.log('ok');
//     } else {
//         console.log('not sme');
//     }
// console.log({currentHour},{currentDate});
//     COURT_SCHEDUELS.aggregrate([
//         {
//             $match: {
//                 // courtId:new ObjectId(req.query.courtId),
//                 // date:currentDate,
//                 // "slot.id":{$gte:currentDate}
//                 courtId: new ObjectId(req.query.courtId),
//                 date: currentDate,
//                 "slot.id": { $gte: currentHour },
//             }
//         }
//     ]).then((result) => {
//         // res.status(500).json({message:'ok'})
//         console.log('then');
//         console.log(result);
//     })
//     try {


//     } catch (error) {

//     }
// })

const getslotsdata = (req, res) => {
    console.log(req.query.courtId);
    let currentHour = 0;
    currentDate = new Date(req.query.date);
    // let d = new Date(new Date().setUTCHours(0, 0, 0, 0))
    // console.log(currentDate == d);
    if (new Date(new Date().setUTCHours(0, 0, 0, 0)) === currentDate) {
        currentHour = new Date().getHours();
        console.log('ok');
    }
    console.log(currentDate);
    // console.log(d)
    COURT_SCHEDUELS.aggregate([
        {
            $match: {
                courtId: new ObjectId(req.query.courtId),
                date: currentDate,
                "slot.id": { $gte: currentHour },
            }
        }, {
            $project: {
                _id: 1, date: 1,slot:1, cost: 1, bookedBy: 1
            }
        }
    ]).then((result) => {
        console.log('slotdata slots');
        console.log(result);
        res.status(200).json(result);
    });
    try {
    } catch (error) {
        console.log(error);
        next();
    }
};

module.exports = { getallcourtdata, getsinglecourtdata, getslotsdata }