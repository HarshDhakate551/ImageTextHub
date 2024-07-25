const express = require("express");
const router = express.Router();
const { Quote, Counter } = require("../script.js");
// ---------DONE------------------
// For hosting main page for deleting data
router.get("/delete", async (req, resp) => {
  const datas = await Quote.find({});
  resp.render("Delete/deletePage_Main", { datas });
});

// For deleting perticular data
router.get("/Delete_Perticular_Data_PAGE", async (req, resp) => {
  const data = parseInt(req.query.No);
  console.log(data);
  const result = await Quote.deleteOne({ SrNo: data });
  const database = await Quote.find({});
  resp.render("Delete/Delete_feedback", { database });
});

router.get("/DeleteAll_Data_Page", async (req, resp) => {
  const result = await Quote.deleteMany({});
  await Counter.findOneAndUpdate(
    { _id: "665338cee0e36ff7e7b9958b" },
    { $set: { counter: 0 } }
  );
  let array = await Counter.find({});
  let cnt = parseInt(array[0].counter);

  if (cnt < 1) {
    console.log("All data deleted and cross checked !!");
  }

  resp.render('Delete/DeleteAll_feedback');
});
// ----------------------------------

module.exports = router;