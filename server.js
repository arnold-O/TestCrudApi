const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
//
dotenv.config({ path: "./config.env" });



const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewurlParser: true
 
  })
  .then((conn) => {
    console.log(conn.connections);
  });

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

