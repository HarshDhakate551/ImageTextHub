const express = require("express");
const multer = require("multer");
const t = require("tesseract.js");
// here tesseractJS is an ORM service which can convert image's text to raw txt which can then be extracted 
const render = express.Router();

// render.use(express.json());
render.use(express.urlencoded({ extended: true }));

// Configuring the diskstorage of multer so that filename can be stored with unique identity even though the filename at the time of upload was same
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}` + "/uploads/"); // Ensure this directory exists
  },
  filename: (req, file, callback) => {
    callback(null, `${file.fieldname + "-" + Date.now() + ".jpeg"}`);
  },
});

const upload = multer({ storage: storage });
// embeding th changes

const { Quote, Counter } = require("../script");
// imoprting the databases for furthur usage

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
