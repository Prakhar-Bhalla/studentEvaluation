const connect = require("./config/db");

const app = require(".");

app.listen(2600, async() => {
    console.log("listening port 2600");
    await connect();
})