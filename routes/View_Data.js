const express = require("express");
const router = express.Router();

const { Quote, Counter } = require("../script");

// --------------DONE ------------------------
// It shows Whole data from database
router.get("/show", async (req, resp) => {
  /*
    // Randomly getting data from the deataset
    // Generating random number
    let indexFinding = await Counter.find({})
    let max = indexFinding[0].counter
    let num = Math.floor(Math.random()*(max)+1)
    console.log(num)
    //using the random number
    const data = await Quote.find({SrNo : num})
    console.log(data);
    // resp.send(data)
    resp.render('./index',{data})
    */
  let datas = await Quote.find({});
  //  resp.send(data)
  resp.render("Show/database_data_show", { datas });

  //  console.log("OK");
  //   resp.render('./index')
});
// ------------------------------------------

module.exports = router;
