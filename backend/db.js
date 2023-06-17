const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/iNoteBook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('Mongodb connected..!')
    })
}

module.exports = connectToMongo