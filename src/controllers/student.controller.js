const Student = require("../models/student.model");

const express = require("express");

const router = express.Router();

router.get("/", async(req, res) => {
    try{
        const students = await Student.find().lean().exec();
        res.send(students);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.post("/", async(req, res) => {
    try{
        const student = await Student.create(req.body);
        res.status(201).send(student);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.get("/:id", async(req, res) => {
    try{
        const student = await Student.findById(req.params.id).lean().exec();
        res.send(student);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.patch("/:id", async(req, res) => {
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        res.send(student);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.delete("/:id", async(req, res) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id).lean().exec();
        res.send(student);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

module.exports = router;