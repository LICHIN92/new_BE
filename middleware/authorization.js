const jwt = require('jsonwebtoken')
const userAuth = (req, res, next) => {
    console.log(req.body);
    try {
        const token = req.headers['authorization'].split(" ")[1]
        jwt.verify(token, process.env.JWT_PASSWORD, (err, decodedToken) => {
            if (decodedToken) {
                // console.log(token);
                req.userId = decodedToken._doc._id;
                // console.log('decoded token');
                // console.log(decodedToken._doc._id);
                // console.log(decodedToken);
                next()

            } else {
                console.log('err');

                res.status(401).json({ message: 'unauthorized user' })
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
const adminAuth = (req, res, next) => {
    console.log(req.headers);
    try {
        const token = req.headers['authorization'].split(' ')[1]
        jwt.verify(token, process.env.JWT_PASSWORD, (err, decodedToken) => {
            // console.log(decodedToken);
            // console.log(token);

            if (decodedToken && decodedToken._doc.role === 1) {
                req.userId = decodedToken._doc._id;

                next()

            } else {
                console.log('error');
                res.status(401).json({ message: 'unauthorized user' })

            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
module.exports = { userAuth, adminAuth }