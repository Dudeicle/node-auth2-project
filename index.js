require("dotenv").config();

const server = require("./api/server.js");

const port = process.env.POST || 1000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
