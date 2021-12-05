const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb+srv://Prakhar2266:Bhalla2266@cluster0.pvv3v.mongodb.net/evaluation");
}

module.exports = connect;