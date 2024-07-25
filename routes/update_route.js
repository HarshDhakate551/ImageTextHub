const express = require("express");
const multer = require("multer");
const t = require("tesseract.js");
const render = express.Router();

// render.use(express.json());
render.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}` + "/uploads/"); // Ensure this directory exists
  },
  filename: (req, file, callback) => {
    callback(null, `${file.fieldname + "-" + Date.now() + ".jpeg"}`);
  },
});

const upload = multer({ storage: storage });

const { Quote, Counter } = require("../script");

async function Update(query, filename) {
  let path = `${__dirname}/uploads/` + `${filename}`;
  const text = (await t.recognize(path, "eng")).data.text;

  // Check if the quote exists
  const existingQuote = await Quote.findOne({ SrNo: query });

  if (existingQuote) {
    await Quote.findOneAndUpdate({ SrNo: query }, { quote: text });
  } else {
    const newQuote = new Quote({ SrNo: query, quote: text });
    await newQuote.save();
  }

  // in  My code i don't have permission to do forEach because it's not a function error
  //   datas.forEach((Single_quote_object) => {
  //         if (Single_quote_object.SrNo === query) {
  //                 SrNo = Single_quote_object.SrNo;
  //               t.recognize(path, "eng").then(async (out) => {
  //                     await Quote.findOneAndUpdate(
  //                           { SrNo: query },
  //                           { quote: out.data.text }
  //                           // new makes an new object , upsert makes the default is not true else it would prevent extra creation
  //                         );
  //                       });
  //                     }
  //                     else{
  //                             t.recognize(path, "eng").then(async (out) => {
  //                                     new Quote({ SrNo: query, quote: out.data.text });
  //                             })
  //                           }
  //                         });
}

render.get("/update", async (req, resp) => {
  const datas = await Quote.find({});
  console.log(datas);
  resp.render("Update/update_form", { datas });
});

render.post("/update_data", upload.single("file"), async (req, resp) => {
  const query = parseInt(req.body.number);
  const filename = req.file.filename;
  console.log(query, filename);
  await Update(query, filename);

  resp.render('Update/update_feedback');
});

module.exports = render;
