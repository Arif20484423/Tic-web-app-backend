const express = require("express");
const { getPermissions } = require("./models/permissions");
const { getRole } = require("./models/role");
const app = express();

console.log(getPermissions("ta"));

app.get("/", (req, res) => {
  res.send("Hello Tic WEB App Backend");
});

app.listen(4000, () => {
  console.log("Server started at port 4000");
});
