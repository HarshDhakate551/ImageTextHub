const express = require("express");
const router = express.Router();

const { Quote, Counter } = require("../script");

// --------------DONE ------------------------
// It shows Whole data from database
router.get("/show", async (req, resp) => {
  let datas = await Quote.find({});
  //  resp.send(data)
  resp.render("Show/database_data_show", { datas });
});
// ------------------------------------------

module.exports = router;
