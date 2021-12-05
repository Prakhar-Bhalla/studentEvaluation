const express = require("express");

const app = express();

app.use(express.json());

const userController = require("./controllers/user.controller");
const topicController = require("./controllers/topic.controller");
const studentController = require("./controllers/student.controller");
const evaluationController = require("./controllers/evaluation.controller");
const resultController = require("./controllers/result.controller");

app.use("/users", userController);
app.use("/topics", topicController);
app.use("/students", studentController);
app.use("/evaluations", evaluationController);
app.use("/results", resultController);

module.exports = app;