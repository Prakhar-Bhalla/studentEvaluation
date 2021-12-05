const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
    evaluation_id : {type: mongoose.Schema.Types.ObjectId, ref: "evaluation", required: true},
    student_id : {type: mongoose.Schema.Types.ObjectId, ref: "student", required: true},
    marks : {type : Number, required: true}
}, {versionKey: false, timestamps: true});

const Result = mongoose.model("result", resultSchema);

module.exports = Result;