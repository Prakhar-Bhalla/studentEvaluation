const Result = require("../models/result.model");

const Student = require("../models/student.model");

const express = require("express");

const router = express.Router();

router.get("/", async(req, res) => {
    try{
        const results = await Result.find().lean().exec();
        res.send(results);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.post("/", async(req, res) => {
    try{
        const result = await Result.create(req.body);
        res.status(201).send(result);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.get("/:id", async(req, res) => {
    try{
        const result = await Result.findById(req.params.id).lean().exec();
        res.send(result);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.patch("/:id", async(req, res) => {
    try{
        const result = await Result.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        res.send(result);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.delete("/:id", async(req, res) => {
    try{
        const result = await Result.findByIdAndDelete(req.params.id).lean().exec();
        res.send(result);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.get("/evaluations/:id/students", async(req, res) => {
    try{
        const results = await Result.find({evaluation_id: req.params.id}, {student_id : 1, marks: 1}).populate("student_id").lean().exec();
        
        const students = results.map(async(result) => {
            try{
                const student = await Student.findById(result.student_id).populate("user_id").lean().exec();
                return student;
            } catch(e) {
                res.status(500).send({message: e.message});
            } 
        }); Promise.all(students).then((values) => {
            res.send(values);
          });
         
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.get("/evaluations/:id/students/topper", async(req, res) => {
    try{
        const results = await Result.find({evaluation_id: req.params.id}, {student_id : 1, marks: 1}).sort({marks: -1}).populate("student_id").lean().exec();
        let std = results[0];
        const student = await Student.findById(std.student_id).populate("user_id").lean().exec();
        res.send({student: student, marks: std.marks});
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

module.exports = router;