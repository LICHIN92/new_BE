const COURT = require('../models/courtmodel')
const COURTSCHEDUES = require('../models/courtSchedule')

const createnewcourt = (req, res) => {
    console.log(req.body);
    console.log('createnewcourt');
    const { name,
        location,
        type,
        addressline1,
        addressline2,
        addressline3,
        landmark,
        pin,
        contactNumber,
        description
    } = req.body;
    const pic = req.files.map((file) => { return { name: file.filename, type: file.mimetype } })
    console.log(req.files);
    console.log(req.body.description);
    console.log(pic);
    COURT({
        name,
        location,
        type,
        addressline1,
        addressline2,
        addressline3,
        landmark,
        pin,
        contactNumber,
        description,
        courtPics: pic
    }).save()
        .then(resp => {
            res.status(200).json({ message: 'court added successfully' })
        }).catch(err => {
            console.log('err');
            console.log(err);
            res.status(500)
        })
}

const createshedule = (req, res) => {
    try {
        console.log(req.body);
        const { startDate, endDate, cost, selectedSlots, courtId } = req.body
        let currentDate = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
        let lastDate = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0));
        const slotObjects = [];
        console.log(currentDate);
        console.log(lastDate);
        while (currentDate <= lastDate) {
            for (let date of selectedSlots) {
                console.log(date);
                slotObjects.push({
                    date: JSON.parse(JSON.stringify(currentDate)),
                    slot: {
                        name: date.name,
                        id: date.id
                    },
                    cost,
                    courtId
                })
            }
            currentDate.setDate(currentDate.getDate() + 1)
        }
        console.log(slotObjects);
        console.log('slots');
        console.log(selectedSlots);
        COURTSCHEDUES.insertMany(slotObjects).then(slotObjects)
            .then((resp)=>{
                // res.status(200).json({message:"court schedules added successfully"})
                res.status(200).json({ message: "court schedules added successfully" });

            } ).catch((err) => {
                console.log(err);
                if(err.code===11000){
                  res.status(500).json({message:`Already Scheduled,duplication`})
       
                }else{
                res.status(500).json({message:`something went wrong`})
                console.log('500');
                }
             });
    } catch (error) {

    }

}
module.exports = { createnewcourt, createshedule }