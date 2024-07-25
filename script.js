// use nodemon filename to run the nodemon instead on node filename
// Changes to make in package.json
// 1 : Go to script add "nodemon" : "nodemon filename"
// now use command ++ npm run nodemon ++ to run the code it would run fine

// Check upload_form not build any form else

const express = require("express");
const app = express();

// creating uploads directory if not present
const fs = require("fs");
console.log(fs.existsSync("./uploads"));
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync(`${__dirname}/uploads`);
}

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const db = require("./modules/database");
// const db = require("./database") //Here the Counter and Quote are threated as function not model
// So we need to change These to Direct importing model as an model via this bellow method
const { Quote, Counter } = require("./modules/database");

module.exports = { Quote, Counter };

// delete routes
// If any chance server stop working to restart either terminate nodemon or use CTRL+S
// on this script to start
const delete_route = require("./routes/delete_route");
app.use("/", delete_route);

// Home Page routes
const Home = require("./routes/Home_page");
app.use("/", Home);

// View Pages routes
const View_routes = require("./routes/View_Data");
app.use("/", View_routes);

// upload Page routes
const Upload_routes = require("./routes/upload_route");
const { log } = require("console");
app.use("/", Upload_routes);

// update Page routes
const Update_page = require("./routes/update_route");
app.use("/", Update_page);

app.listen(process.env.PORT);

// It's their so that i can reset all things at once
// Won't use head meathod cause idk how to send response to it
// app.put("/", async (req, resp) => {
//   let array = await Counter.find({});
//   let cnt = parseInt(array[0].counter);

//   if (cnt >= 1) {
//     await Quote.deleteMany({});
//     await Counter.updateOne(
//       { _id: "665338cee0e36ff7e7b9958b" },
//       {
//         $set: { counter: 0 },
//       }
//     );
//     resp.send("Whole data from both collections deleted successfully");
//   } else {
//     resp.send("Nothing to delete from the database");
//   }
// });
