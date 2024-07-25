const express = require('express');
const router = express.Router();

const {Quote,Counter} = require('../script')

// ----------------Done--------------
router.get("/", async (req, resp) => {
    // Randomly getting data from the deataset
    // Generating random number
    let indexFinding = await Counter.find({});

    if (indexFinding.length === 0) {
    // Initialize the counter if it doesn't exist
    const initialCounter = new Counter({ counter: 1 });
    await initialCounter.save();
    indexFinding = [initialCounter];
  }
    
    let max = indexFinding[0].counter;
    let num = Math.floor(Math.random() * max + 1);
    console.log(num);
    //using the random number
    const data = await Quote.find({ SrNo: num });
    console.log(data);
    // resp.send(data)
    resp.render("Main_Page/index", { data });
    // resp.render("./index");
  });

module.exports = router;
