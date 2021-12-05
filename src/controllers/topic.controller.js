const Topic = require("../models/topic.model");

const express = require("express");

const router = express.Router();

router.get("/", async(req, res) => {
    try{
        const topics = await Topic.find().lean().exec();
        res.send(topics);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.post("/", async(req, res) => {
    try{
        const topic = await Topic.create(req.body);
        res.status(201).send(topic);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.get("/:id", async(req, res) => {
    try{
        const topic = await Topic.findById(req.params.id).lean().exec();
        res.send(topic);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.patch("/:id", async(req, res) => {
    try{
        const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        res.send(topic);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.delete("/:id", async(req, res) => {
    try{
        const topic = await Topic.findByIdAndDelete(req.params.id).lean().exec();
        res.send(topic);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

module.exports = router;