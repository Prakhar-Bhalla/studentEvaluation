const User = require("../models/user.model");

const express = require("express");

const router = express.Router();

router.get("/", async(req, res) => {
    try{
        const users = await User.find().lean().exec();
        res.send(users);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.post("/", async(req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.get("/:id", async(req, res) => {
    try{
        const user = await User.findById(req.params.id).lean().exec();
        res.send(user);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.patch("/:id", async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        res.send(user);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

router.delete("/:id", async(req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        res.send(user);
    } catch(e){
        res.status(500).send({message: e.message});
    }
});

module.exports = router;