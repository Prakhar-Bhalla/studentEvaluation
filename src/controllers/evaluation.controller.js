const Evaluation = require("../models/evaluation.model");

const express = require("express");

const router = express.Router();

router.get("/", async(req, res) => {
    try{
        const evaluations = await Evaluation.find().lean().exec();
        res.send(evaluations);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.post("/", async(req, res) => {
    try{
        const evaluation = await Evaluation.create(req.body);
        res.status(201).send(evaluation);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.get("/:id", async(req, res) => {
    try{
        const evaluation = await Evaluation.findById(req.params.id).lean().exec();
        res.send(evaluation);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.patch("/:id", async(req, res) => {
    try{
        const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        res.send(evaluation);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.delete("/:id", async(req, res) => {
    try{
        const evaluation = await Evaluation.findByIdAndDelete(req.params.id).lean().exec();
        res.send(evaluation);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

module.exports = router;