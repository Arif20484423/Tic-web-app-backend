require("dotenv").config();
const {app} = require("./app")
const connectDb = require("./db/connect-db");

connectDb()
  .then((result) => {
    console.log(result);
    app.listen(4000, () => {
      console.log("Server started at port 4000");
    });
  })
  .catch((err) => {
    console.log("Error connecting database");
  });





